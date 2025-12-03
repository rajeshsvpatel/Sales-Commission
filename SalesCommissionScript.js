// Global variables
var salesOrderId;
var commissionRecordId;
var zipCodeData = {
    SE: [],
    BC: [],
    SWC: []
};
var originalValues = {};
var currentUserId;
var currentUserName;
var dataTable;
var currentLookupCategory;
var currentLookupType;

// Initialize on page load
$(document).ready(function() {
    try {
        // Get the current record ID from Dynamics 365 context
        var formContext = parent.Xrm.Page;
        salesOrderId = formContext.data.entity.getId().replace('{', '').replace('}', '');

        // Get current user information
        var userSettings = parent.Xrm.Utility.getGlobalContext().userSettings;
        currentUserId = userSettings.userId.replace('{', '').replace('}', '');
        currentUserName = userSettings.userName;

        // Load all data
        loadCommissionData();
        loadZipCodeData();

        // Attach event handlers to territory inputs
        attachTerritoryInputHandlers();

    } catch (error) {
        console.error("Initialization error:", error);
        showMessage("Error initializing form: " + error.message, "error");
    }
});

// Load commission data for the current sales order
function loadCommissionData() {
    showMessage("Loading commission data...", "info");

    var fetchXml = [
        "<fetch mapping='logical'>",
        "  <entity name='crmgp_salescommission'>",
        "    <attribute name='crmgp_salescommissionid' />",
        "    <attribute name='crmgp_sespec1zipcode' />",
        "    <attribute name='crmgp_sesell1zipcode' />",
        "    <attribute name='crmgp_sedestzipcode' />",
        "    <attribute name='crmgp_sespec2zipcode' />",
        "    <attribute name='crmgp_sesell2zipcode' />",
        "    <attribute name='crmgp_sespec30zipcode' />",
        "    <attribute name='crmgp_bcspec1zipcode' />",
        "    <attribute name='crmgp_bcsell1zipcode' />",
        "    <attribute name='crmgp_bcdest1zipcode' />",
        "    <attribute name='crmgp_bcspec2zipcode' />",
        "    <attribute name='crmgp_bcsell2zipcode' />",
        "    <attribute name='crmgp_bcspec30zipcode' />",
        "    <attribute name='crmgp_swcspec1zipcode' />",
        "    <attribute name='crmgp_swcsell1zipcode' />",
        "    <attribute name='crmgp_swcdest1zipcode' />",
        "    <attribute name='crmgp_swcspec2zipcode' />",
        "    <attribute name='crmgp_swcsell2zipcode' />",
        "    <attribute name='crmgp_swcspec30zipcode' />",
        "    <attribute name='crmgp_sespec1override' />",
        "    <attribute name='crmgp_sesell1override' />",
        "    <attribute name='crmgp_sedestoverride' />",
        "    <attribute name='crmgp_sespec2override' />",
        "    <attribute name='crmgp_sesell2override' />",
        "    <attribute name='crmgp_sespec30override' />",
        "    <attribute name='crmgp_bcspec1override' />",
        "    <attribute name='crmgp_bcsell1override' />",
        "    <attribute name='crmgp_bcdestoverride' />",
        "    <attribute name='crmgp_bcspec2override' />",
        "    <attribute name='crmgp_bcsell2override' />",
        "    <attribute name='crmgp_bcspec30override' />",
        "    <attribute name='crmgp_swcspec1override' />",
        "    <attribute name='crmgp_swcsell1override' />",
        "    <attribute name='crmgp_swcdestoverride' />",
        "    <attribute name='crmgp_swcspec2override' />",
        "    <attribute name='crmgp_swcsell2override' />",
        "    <attribute name='crmgp_swcspec30override' />",
        "    <filter type='and'>",
        "      <condition attribute='crmgp_salesorder' operator='eq' value='" + salesOrderId + "' />",
        "    </filter>",
        "  </entity>",
        "</fetch>"
    ].join("");

    parent.Xrm.WebApi.retrieveMultipleRecords("crmgp_salescommission", "?fetchXml=" + encodeURIComponent(fetchXml)).then(
        function success(result) {
            if (result.entities.length > 0) {
                var commission = result.entities[0];
                commissionRecordId = commission.crmgp_salescommissionid;
                populateCommissionFields(commission);
                showMessage("Commission data loaded successfully", "success");
            } else {
                showMessage("No commission data found. You can create a new record.", "info");
            }
        },
        function(error) {
            console.error("Error loading commission data:", error);
            showMessage("Error loading commission data: " + error.message, "error");
        }
    );
}

// Populate commission fields with loaded data
function populateCommissionFields(commission) {
    // SE Panel
    populateFieldGroup('SE', 'Spec1', commission._crmgp_sespec1zipcode_value, commission.crmgp_sespec1override);
    populateFieldGroup('SE', 'Sell1', commission._crmgp_sesell1zipcode_value, commission.crmgp_sesell1override);
    populateFieldGroup('SE', 'Dest', commission._crmgp_sedestzipcode_value, commission.crmgp_sedestoverride);
    populateFieldGroup('SE', 'Spec2', commission._crmgp_sespec2zipcode_value, commission.crmgp_sespec2override);
    populateFieldGroup('SE', 'Sell2', commission._crmgp_sesell2zipcode_value, commission.crmgp_sesell2override);
    populateFieldGroup('SE', 'Spec30', commission._crmgp_sespec30zipcode_value, commission.crmgp_sespec30override);

    // BC Panel
    populateFieldGroup('BC', 'Spec1', commission._crmgp_bcspec1zipcode_value, commission.crmgp_bcspec1override);
    populateFieldGroup('BC', 'Sell1', commission._crmgp_bcsell1zipcode_value, commission.crmgp_bcsell1override);
    populateFieldGroup('BC', 'Dest', commission._crmgp_bcdest1zipcode_value, commission.crmgp_bcdestoverride);
    populateFieldGroup('BC', 'Spec2', commission._crmgp_bcspec2zipcode_value, commission.crmgp_bcspec2override);
    populateFieldGroup('BC', 'Sell2', commission._crmgp_bcsell2zipcode_value, commission.crmgp_bcsell2override);
    populateFieldGroup('BC', 'Spec30', commission._crmgp_bcspec30zipcode_value, commission.crmgp_bcspec30override);

    // SWC Panel
    populateFieldGroup('SWC', 'Spec1', commission._crmgp_swcspec1zipcode_value, commission.crmgp_swcspec1override);
    populateFieldGroup('SWC', 'Sell1', commission._crmgp_swcsell1zipcode_value, commission.crmgp_swcsell1override);
    populateFieldGroup('SWC', 'Dest', commission._crmgp_swcdest1zipcode_value, commission.crmgp_swcdestoverride);
    populateFieldGroup('SWC', 'Spec2', commission._crmgp_swcspec2zipcode_value, commission.crmgp_swcspec2override);
    populateFieldGroup('SWC', 'Sell2', commission._crmgp_swcsell2zipcode_value, commission.crmgp_swcsell2override);
    populateFieldGroup('SWC', 'Spec30', commission._crmgp_swcspec30zipcode_value, commission.crmgp_swcspec30override);

    // Auto-expand panels with data
    autoExpandPanels();
}

// Populate individual field group
function populateFieldGroup(category, type, zipcodeId, overrideValue) {
    if (zipcodeId) {
        // Fetch zipcode details to get territory and user
        parent.Xrm.WebApi.retrieveRecord("new_zipcode", zipcodeId, "?$select=new_territory,_new_userid_value").then(
            function success(zipcode) {
                var fieldPrefix = category.toLowerCase() + type;
                var territoryInput = document.getElementById(fieldPrefix + 'Territory');
                var userDisplay = document.getElementById(fieldPrefix + 'User');
                var overrideCheckbox = document.getElementById(fieldPrefix + 'Override');

                if (territoryInput) {
                    territoryInput.value = zipcode.new_territory || '';
                    territoryInput.setAttribute('data-zipcode-id', zipcodeId);
                }

                if (zipcode._new_userid_value) {
                    // Fetch user name
                    parent.Xrm.WebApi.retrieveRecord("systemuser", zipcode._new_userid_value, "?$select=fullname").then(
                        function(user) {
                            if (userDisplay) {
                                userDisplay.textContent = user.fullname || '';
                                userDisplay.setAttribute('data-user-id', zipcode._new_userid_value);
                            }
                        }
                    );
                }

                if (overrideCheckbox) {
                    overrideCheckbox.checked = overrideValue === true;
                }

                // Store original values
                originalValues[fieldPrefix] = {
                    territory: zipcode.new_territory || '',
                    userId: zipcode._new_userid_value || '',
                    zipcodeId: zipcodeId
                };
            }
        );
    }
}

// Load ZIP code data for all categories
function loadZipCodeData() {
    loadZipCodeByCategory('SE');
    loadZipCodeByCategory('BC');
    loadZipCodeByCategory('SWC');
}

// Load ZIP code data by category
function loadZipCodeByCategory(category) {
    var fetchXml = [
        "<fetch mapping='logical'>",
        "  <entity name='new_zipcode'>",
        "    <attribute name='new_zipcodeid' />",
        "    <attribute name='new_territory' />",
        "    <attribute name='new_zipcode' />",
        "    <attribute name='_new_userid_value' />",
        "    <filter type='and'>",
        "      <condition attribute='new_category' operator='eq' value='" + category + "' />",
        "    </filter>",
        "  </entity>",
        "</fetch>"
    ].join("");

    parent.Xrm.WebApi.retrieveMultipleRecords("new_zipcode", "?fetchXml=" + encodeURIComponent(fetchXml)).then(
        function success(result) {
            var records = [];
            var userPromises = [];

            result.entities.forEach(function(zipcode) {
                var record = {
                    id: zipcode.new_zipcodeid,
                    territory: zipcode.new_territory,
                    zipcode: zipcode.new_zipcode,
                    userId: zipcode._new_userid_value,
                    userName: ''
                };

                if (zipcode._new_userid_value) {
                    var promise = parent.Xrm.WebApi.retrieveRecord("systemuser", zipcode._new_userid_value, "?$select=fullname").then(
                        function(user) {
                            record.userName = user.fullname;
                        }
                    );
                    userPromises.push(promise);
                }

                records.push(record);
            });

            Promise.all(userPromises).then(function() {
                zipCodeData[category] = records;
            });
        },
        function(error) {
            console.error("Error loading " + category + " zipcode data:", error);
        }
    );
}

// Attach territory input change handlers
function attachTerritoryInputHandlers() {
    $('.territory-input').on('blur', function() {
        var input = $(this);
        var category = input.data('category');
        var type = input.data('type');
        var enteredTerritory = input.val().trim();

        if (enteredTerritory === '') {
            return;
        }

        validateAndPopulateTerritory(input, category, enteredTerritory);
    });
}

// Validate territory and populate user
function validateAndPopulateTerritory(input, category, territory) {
    var matchingZipcode = zipCodeData[category].find(function(z) {
        return z.territory === territory;
    });

    if (matchingZipcode) {
        // Valid territory - populate user
        var fieldPrefix = input.attr('id').replace('Territory', '');
        var userDisplay = $('#' + fieldPrefix + 'User');

        userDisplay.text(matchingZipcode.userName);
        userDisplay.attr('data-user-id', matchingZipcode.userId);
        input.attr('data-zipcode-id', matchingZipcode.id);

        showMessage("Territory validated successfully", "success");
    } else {
        // Invalid territory - show error and restore previous value
        showMessage("Invalid territory number for " + category + ". Please enter a valid territory or use the lookup.", "error");

        var fieldPrefix = input.attr('id').replace('Territory', '');
        if (originalValues[fieldPrefix]) {
            input.val(originalValues[fieldPrefix].territory);
        } else {
            input.val('');
        }
    }
}

// Toggle panel collapse/expand
function togglePanel(panelId) {
    var panel = $('#' + panelId);
    var content = panel.find('.panel-content');
    var icon = panel.find('.toggle-icon');

    content.toggleClass('expanded');
    icon.toggleClass('collapsed');
}

// Auto-expand panels with data
function autoExpandPanels() {
    ['sePanel', 'bcPanel', 'swcPanel'].forEach(function(panelId) {
        var panel = $('#' + panelId);
        var hasData = false;

        panel.find('.territory-input').each(function() {
            if ($(this).val() !== '') {
                hasData = true;
                return false;
            }
        });

        if (hasData) {
            panel.find('.panel-content').addClass('expanded');
            panel.find('.toggle-icon').removeClass('collapsed');
        }
    });
}

// Open lookup modal
function openLookup(category, type) {
    currentLookupCategory = category;
    currentLookupType = type;

    var modal = $('#lookupModal');
    modal.show();

    // Populate lookup table
    populateLookupTable(category);
}

// Populate lookup table with DataTables
function populateLookupTable(category) {
    var tbody = $('#lookupTableBody');
    tbody.empty();

    zipCodeData[category].forEach(function(record) {
        var row = $('<tr>');
        row.append($('<td>').text(record.territory || ''));
        row.append($('<td>').text(record.zipcode || ''));
        row.append($('<td>').text(record.userName || ''));
        row.append($('<td>').html('<button class="lookup-btn" onclick="selectLookupRecord(\'' + record.id + '\', \'' + record.territory + '\', \'' + record.userName + '\', \'' + record.userId + '\')">Select</button>'));
        tbody.append(row);
    });

    // Destroy existing DataTable if it exists
    if (dataTable) {
        dataTable.destroy();
    }

    // Initialize DataTable
    dataTable = $('#lookupTable').DataTable({
        pageLength: 10,
        order: [[0, 'asc']],
        language: {
            search: "Search:",
            lengthMenu: "Show _MENU_ entries",
            info: "Showing _START_ to _END_ of _TOTAL_ entries",
            paginate: {
                first: "First",
                last: "Last",
                next: "Next",
                previous: "Previous"
            }
        }
    });
}

// Select record from lookup
function selectLookupRecord(zipcodeId, territory, userName, userId) {
    var fieldPrefix = currentLookupCategory.toLowerCase() + currentLookupType;
    var territoryInput = $('#' + fieldPrefix + 'Territory');
    var userDisplay = $('#' + fieldPrefix + 'User');

    territoryInput.val(territory);
    territoryInput.attr('data-zipcode-id', zipcodeId);
    userDisplay.text(userName);
    userDisplay.attr('data-user-id', userId);

    closeLookup();
    showMessage("Territory and user selected successfully", "success");
}

// Close lookup modal
function closeLookup() {
    $('#lookupModal').hide();
    if (dataTable) {
        dataTable.destroy();
        dataTable = null;
    }
}

// Save commission data
function saveCommissionData() {
    showMessage("Saving commission data...", "info");

    var commissionData = buildCommissionDataObject();
    var auditRecords = [];

    // Check for changes and create audit records
    Object.keys(commissionData).forEach(function(fieldName) {
        var fieldPrefix = getFieldPrefixFromApiName(fieldName);
        if (originalValues[fieldPrefix]) {
            var oldValue = originalValues[fieldPrefix];
            var newZipcodeId = commissionData[fieldName];

            if (oldValue.zipcodeId !== newZipcodeId) {
                // Value changed - create audit record
                auditRecords.push({
                    fieldName: fieldName,
                    oldZipcodeId: oldValue.zipcodeId,
                    oldTerritory: oldValue.territory,
                    oldUserId: oldValue.userId,
                    newZipcodeId: newZipcodeId
                });
            }
        }
    });

    if (commissionRecordId) {
        // Update existing record
        parent.Xrm.WebApi.updateRecord("crmgp_salescommission", commissionRecordId, commissionData).then(
            function success() {
                showMessage("Commission data saved successfully", "success");

                // Create audit trail records
                if (auditRecords.length > 0) {
                    createAuditRecords(auditRecords);
                }

                // Reload data
                loadCommissionData();
            },
            function(error) {
                console.error("Error saving commission data:", error);
                showMessage("Error saving commission data: " + error.message, "error");
            }
        );
    } else {
        // Create new record
        commissionData["crmgp_salesorder@odata.bind"] = "/salesorders(" + salesOrderId + ")";

        parent.Xrm.WebApi.createRecord("crmgp_salescommission", commissionData).then(
            function success(result) {
                commissionRecordId = result.id;
                showMessage("Commission data created successfully", "success");

                // Reload data
                loadCommissionData();
            },
            function(error) {
                console.error("Error creating commission data:", error);
                showMessage("Error creating commission data: " + error.message, "error");
            }
        );
    }
}

// Build commission data object
function buildCommissionDataObject() {
    var data = {};

    // SE Panel
    data["crmgp_sespec1zipcode@odata.bind"] = getZipcodeBinding('seSpec1Territory');
    data["crmgp_sesell1zipcode@odata.bind"] = getZipcodeBinding('seSell1Territory');
    data["crmgp_sedestzipcode@odata.bind"] = getZipcodeBinding('seDestTerritory');
    data["crmgp_sespec2zipcode@odata.bind"] = getZipcodeBinding('seSpec2Territory');
    data["crmgp_sesell2zipcode@odata.bind"] = getZipcodeBinding('seSell2Territory');
    data["crmgp_sespec30zipcode@odata.bind"] = getZipcodeBinding('seSpec30Territory');

    data.crmgp_sespec1override = $('#seSpec1Override').is(':checked');
    data.crmgp_sesell1override = $('#seSell1Override').is(':checked');
    data.crmgp_sedestoverride = $('#seDestOverride').is(':checked');
    data.crmgp_sespec2override = $('#seSpec2Override').is(':checked');
    data.crmgp_sesell2override = $('#seSell2Override').is(':checked');
    data.crmgp_sespec30override = $('#seSpec30Override').is(':checked');

    // BC Panel
    data["crmgp_bcspec1zipcode@odata.bind"] = getZipcodeBinding('bcSpec1Territory');
    data["crmgp_bcsell1zipcode@odata.bind"] = getZipcodeBinding('bcSell1Territory');
    data["crmgp_bcdest1zipcode@odata.bind"] = getZipcodeBinding('bcDestTerritory');
    data["crmgp_bcspec2zipcode@odata.bind"] = getZipcodeBinding('bcSpec2Territory');
    data["crmgp_bcsell2zipcode@odata.bind"] = getZipcodeBinding('bcSell2Territory');
    data["crmgp_bcspec30zipcode@odata.bind"] = getZipcodeBinding('bcSpec30Territory');

    data.crmgp_bcspec1override = $('#bcSpec1Override').is(':checked');
    data.crmgp_bcsell1override = $('#bcSell1Override').is(':checked');
    data.crmgp_bcdestoverride = $('#bcDestOverride').is(':checked');
    data.crmgp_bcspec2override = $('#bcSpec2Override').is(':checked');
    data.crmgp_bcsell2override = $('#bcSell2Override').is(':checked');
    data.crmgp_bcspec30override = $('#bcSpec30Override').is(':checked');

    // SWC Panel
    data["crmgp_swcspec1zipcode@odata.bind"] = getZipcodeBinding('swcSpec1Territory');
    data["crmgp_swcsell1zipcode@odata.bind"] = getZipcodeBinding('swcSell1Territory');
    data["crmgp_swcdest1zipcode@odata.bind"] = getZipcodeBinding('swcDestTerritory');
    data["crmgp_swcspec2zipcode@odata.bind"] = getZipcodeBinding('swcSpec2Territory');
    data["crmgp_swcsell2zipcode@odata.bind"] = getZipcodeBinding('swcSell2Territory');
    data["crmgp_swcspec30zipcode@odata.bind"] = getZipcodeBinding('swcSpec30Territory');

    data.crmgp_swcspec1override = $('#swcSpec1Override').is(':checked');
    data.crmgp_swcsell1override = $('#swcSell1Override').is(':checked');
    data.crmgp_swcdestoverride = $('#swcDestOverride').is(':checked');
    data.crmgp_swcspec2override = $('#swcSpec2Override').is(':checked');
    data.crmgp_swcsell2override = $('#swcSell2Override').is(':checked');
    data.crmgp_swcspec30override = $('#swcSpec30Override').is(':checked');

    // Remove null/undefined bindings
    Object.keys(data).forEach(function(key) {
        if (data[key] === null || data[key] === undefined) {
            delete data[key];
        }
    });

    return data;
}

// Get zipcode binding for OData
function getZipcodeBinding(inputId) {
    var input = $('#' + inputId);
    var zipcodeId = input.attr('data-zipcode-id');

    if (zipcodeId) {
        return "/new_zipcodes(" + zipcodeId + ")";
    }
    return null;
}

// Get field prefix from API name
function getFieldPrefixFromApiName(apiName) {
    var mapping = {
        'crmgp_sespec1zipcode': 'seSpec1',
        'crmgp_sesell1zipcode': 'seSell1',
        'crmgp_sedestzipcode': 'seDest',
        'crmgp_sespec2zipcode': 'seSpec2',
        'crmgp_sesell2zipcode': 'seSell2',
        'crmgp_sespec30zipcode': 'seSpec30',
        'crmgp_bcspec1zipcode': 'bcSpec1',
        'crmgp_bcsell1zipcode': 'bcSell1',
        'crmgp_bcdest1zipcode': 'bcDest',
        'crmgp_bcspec2zipcode': 'bcSpec2',
        'crmgp_bcsell2zipcode': 'bcSell2',
        'crmgp_bcspec30zipcode': 'bcSpec30',
        'crmgp_swcspec1zipcode': 'swcSpec1',
        'crmgp_swcsell1zipcode': 'swcSell1',
        'crmgp_swcdest1zipcode': 'swcDest',
        'crmgp_swcspec2zipcode': 'swcSpec2',
        'crmgp_swcsell2zipcode': 'swcSell2',
        'crmgp_swcspec30zipcode': 'swcSpec30'
    };

    return mapping[apiName] || apiName;
}

// Create audit records
function createAuditRecords(auditRecords) {
    auditRecords.forEach(function(audit) {
        var auditData = {
            "crmgp_salesorder@odata.bind": "/salesorders(" + salesOrderId + ")",
            "crmgp_changedby@odata.bind": "/systemusers(" + currentUserId + ")",
            "crmgp_changedate": new Date().toISOString(),
            "crmgp_fieldname": audit.fieldName,
            "crmgp_oldterritory": audit.oldTerritory || '',
            "crmgp_newterritory": getNewTerritoryValue(audit.newZipcodeId)
        };

        parent.Xrm.WebApi.createRecord("crmgp_salescommission_audit_trail", auditData).then(
            function success() {
                console.log("Audit record created");
            },
            function(error) {
                console.error("Error creating audit record:", error);
            }
        );
    });
}

// Get new territory value from zipcode ID
function getNewTerritoryValue(zipcodeId) {
    var territory = '';

    Object.keys(zipCodeData).forEach(function(category) {
        var match = zipCodeData[category].find(function(z) {
            return z.id === zipcodeId;
        });

        if (match) {
            territory = match.territory;
        }
    });

    return territory;
}

// Open audit trail modal
function openAuditTrail() {
    var modal = $('#auditModal');
    modal.show();

    loadAuditTrail();
}

// Load audit trail data
function loadAuditTrail() {
    var tbody = $('#auditTableBody');
    tbody.html('<tr><td colspan="7" class="loading">Loading audit trail...</td></tr>');

    var fetchXml = [
        "<fetch mapping='logical'>",
        "  <entity name='crmgp_salescommission_audit_trail'>",
        "    <attribute name='crmgp_changedby' />",
        "    <attribute name='crmgp_changedate' />",
        "    <attribute name='crmgp_fieldname' />",
        "    <attribute name='crmgp_oldterritory' />",
        "    <attribute name='crmgp_olduser' />",
        "    <attribute name='crmgp_newterritory' />",
        "    <attribute name='crmgp_newuser' />",
        "    <filter type='and'>",
        "      <condition attribute='crmgp_salesorder' operator='eq' value='" + salesOrderId + "' />",
        "    </filter>",
        "    <order attribute='crmgp_changedate' descending='true' />",
        "  </entity>",
        "</fetch>"
    ].join("");

    parent.Xrm.WebApi.retrieveMultipleRecords("crmgp_salescommission_audit_trail", "?fetchXml=" + encodeURIComponent(fetchXml)).then(
        function success(result) {
            tbody.empty();

            if (result.entities.length === 0) {
                tbody.html('<tr><td colspan="7" style="text-align: center;">No audit records found</td></tr>');
                return;
            }

            result.entities.forEach(function(audit) {
                var row = $('<tr>');

                // Fetch changed by user name
                if (audit._crmgp_changedby_value) {
                    parent.Xrm.WebApi.retrieveRecord("systemuser", audit._crmgp_changedby_value, "?$select=fullname").then(
                        function(user) {
                            var changeDate = audit.crmgp_changedate ? new Date(audit.crmgp_changedate).toLocaleString() : '';

                            row.append($('<td>').text(user.fullname || ''));
                            row.append($('<td>').text(changeDate));
                            row.append($('<td>').text(audit.crmgp_fieldname || ''));
                            row.append($('<td>').text(audit.crmgp_oldterritory || ''));
                            row.append($('<td>').text(audit.crmgp_olduser || ''));
                            row.append($('<td>').text(audit.crmgp_newterritory || ''));
                            row.append($('<td>').text(audit.crmgp_newuser || ''));

                            tbody.append(row);
                        }
                    );
                }
            });
        },
        function(error) {
            console.error("Error loading audit trail:", error);
            tbody.html('<tr><td colspan="7" class="error-message">Error loading audit trail: ' + error.message + '</td></tr>');
        }
    );
}

// Close audit trail modal
function closeAuditTrail() {
    $('#auditModal').hide();
}

// Show message
function showMessage(message, type) {
    var container = $('#messageContainer');
    var className = type === 'error' ? 'error-message' : (type === 'success' ? 'success-message' : 'loading');

    var messageDiv = $('<div>').addClass(className).text(message);
    container.html(messageDiv);

    // Auto-hide success messages after 3 seconds
    if (type === 'success' || type === 'info') {
        setTimeout(function() {
            messageDiv.fadeOut(function() {
                $(this).remove();
            });
        }, 3000);
    }
}

// Close modals when clicking outside
$(window).on('click', function(event) {
    if ($(event.target).hasClass('modal')) {
        $(event.target).hide();
        if (dataTable) {
            dataTable.destroy();
            dataTable = null;
        }
    }
});

# Sales Commission Web Resource - Deployment Guide

## Overview
This guide provides step-by-step instructions for deploying the Sales Commission Web Resource solution in Dynamics 365.

## Prerequisites
- Dynamics 365 environment with system administrator access
- Understanding of Dynamics 365 Web Resources
- Access to create and modify entities in Dynamics 365

---

## 1. Entity Configuration

### 1.1 Sales Order Entity (salesorder)
This is a standard Dynamics 365 entity. No modifications required.

### 1.2 System User Entity (systemuser)
This is a standard Dynamics 365 entity. No modifications required.

### 1.3 Create: new_zipcode Entity

**Display Name:** ZIP Code
**Plural Name:** ZIP Codes
**Schema Name:** new_zipcode
**Ownership:** Organization

#### Fields:

| Display Name | Schema Name | Data Type | Description |
|--------------|-------------|-----------|-------------|
| ZIP Code | new_zipcode | Single Line of Text (100) | Primary name field |
| Territory | new_territory | Single Line of Text (50) | Territory number |
| Category | new_category | Option Set | SE, BC, or SWC |
| User | new_userid | Lookup (systemuser) | Associated system user |

**Option Set Values for Category:**
- SE = 1
- BC = 2
- SWC = 3

### 1.4 Create: crmgp_salescommission Entity

**Display Name:** Sales Commission
**Plural Name:** Sales Commissions
**Schema Name:** crmgp_salescommission
**Ownership:** Organization

#### Fields:

| Display Name | Schema Name | Data Type | Description |
|--------------|-------------|-----------|-------------|
| Name | crmgp_name | Single Line of Text (100) | Primary name field |
| Sales Order | crmgp_salesorder | Lookup (salesorder) | Related sales order |

**SE Fields:**
| Display Name | Schema Name | Data Type |
|--------------|-------------|-----------|
| SE Spec1 Zipcode | crmgp_sespec1zipcode | Lookup (new_zipcode) |
| SE Sell1 Zipcode | crmgp_sesell1zipcode | Lookup (new_zipcode) |
| SE Dest Zipcode | crmgp_sedestzipcode | Lookup (new_zipcode) |
| SE Spec2 Zipcode | crmgp_sespec2zipcode | Lookup (new_zipcode) |
| SE Sell2 Zipcode | crmgp_sesell2zipcode | Lookup (new_zipcode) |
| SE Spec30 Zipcode | crmgp_sespec30zipcode | Lookup (new_zipcode) |
| SE Spec1 Override | crmgp_sespec1override | Two Options (Yes/No) |
| SE Sell1 Override | crmgp_sesell1override | Two Options (Yes/No) |
| SE Dest Override | crmgp_sedestoverride | Two Options (Yes/No) |
| SE Spec2 Override | crmgp_sespec2override | Two Options (Yes/No) |
| SE Sell2 Override | crmgp_sesell2override | Two Options (Yes/No) |
| SE Spec30 Override | crmgp_sespec30override | Two Options (Yes/No) |

**BC Fields:**
| Display Name | Schema Name | Data Type |
|--------------|-------------|-----------|
| BC Spec1 Zipcode | crmgp_bcspec1zipcode | Lookup (new_zipcode) |
| BC Sell1 Zipcode | crmgp_bcsell1zipcode | Lookup (new_zipcode) |
| BC Dest1 Zipcode | crmgp_bcdest1zipcode | Lookup (new_zipcode) |
| BC Spec2 Zipcode | crmgp_bcspec2zipcode | Lookup (new_zipcode) |
| BC Sell2 Zipcode | crmgp_bcsell2zipcode | Lookup (new_zipcode) |
| BC Spec30 Zipcode | crmgp_bcspec30zipcode | Lookup (new_zipcode) |
| BC Spec1 Override | crmgp_bcspec1override | Two Options (Yes/No) |
| BC Sell1 Override | crmgp_bcsell1override | Two Options (Yes/No) |
| BC Dest Override | crmgp_bcdestoverride | Two Options (Yes/No) |
| BC Spec2 Override | crmgp_bcspec2override | Two Options (Yes/No) |
| BC Sell2 Override | crmgp_bcsell2override | Two Options (Yes/No) |
| BC Spec30 Override | crmgp_bcspec30override | Two Options (Yes/No) |

**SWC Fields:**
| Display Name | Schema Name | Data Type |
|--------------|-------------|-----------|
| SWC Spec1 Zipcode | crmgp_swcspec1zipcode | Lookup (new_zipcode) |
| SWC Sell1 Zipcode | crmgp_swcsell1zipcode | Lookup (new_zipcode) |
| SWC Dest1 Zipcode | crmgp_swcdest1zipcode | Lookup (new_zipcode) |
| SWC Spec2 Zipcode | crmgp_swcspec2zipcode | Lookup (new_zipcode) |
| SWC Sell2 Zipcode | crmgp_swcsell2zipcode | Lookup (new_zipcode) |
| SWC Spec30 Zipcode | crmgp_swcspec30zipcode | Lookup (new_zipcode) |
| SWC Spec1 Override | crmgp_swcspec1override | Two Options (Yes/No) |
| SWC Sell1 Override | crmgp_swcsell1override | Two Options (Yes/No) |
| SWC Dest Override | crmgp_swcdestoverride | Two Options (Yes/No) |
| SWC Spec2 Override | crmgp_swcspec2override | Two Options (Yes/No) |
| SWC Sell2 Override | crmgp_swcsell2override | Two Options (Yes/No) |
| SWC Spec30 Override | crmgp_swcspec30override | Two Options (Yes/No) |

### 1.5 Create: crmgp_salescommission_audit_trail Entity

**Display Name:** Sales Commission Audit Trail
**Plural Name:** Sales Commission Audit Trails
**Schema Name:** crmgp_salescommission_audit_trail
**Ownership:** Organization

#### Fields:

| Display Name | Schema Name | Data Type | Description |
|--------------|-------------|-----------|-------------|
| Name | crmgp_name | Single Line of Text (100) | Auto-numbered |
| Sales Order | crmgp_salesorder | Lookup (salesorder) | Related sales order |
| Changed By | crmgp_changedby | Lookup (systemuser) | User who made the change |
| Change Date | crmgp_changedate | Date and Time | When the change occurred |
| Field Name | crmgp_fieldname | Single Line of Text (100) | Field that was changed |
| Old Territory | crmgp_oldterritory | Single Line of Text (50) | Previous territory value |
| Old User | crmgp_olduser | Single Line of Text (200) | Previous user name |
| New Territory | crmgp_newterritory | Single Line of Text (50) | New territory value |
| New User | crmgp_newuser | Single Line of Text (200) | New user name |

---

## 2. Create Web Resources

### 2.1 HTML Web Resource

1. Navigate to **Settings** > **Customizations** > **Customize the System**
2. In the left navigation, select **Web Resources**
3. Click **New**
4. Configure the web resource:
   - **Name:** crmgp_SalesCommissionWebResource
   - **Display Name:** Sales Commission Layout
   - **Type:** Web Page (HTML)
   - **Upload File:** Upload `SalesCommissionWebResource.html`
5. Click **Save** and **Publish**

### 2.2 JavaScript Web Resource

1. Click **New** to create another web resource
2. Configure the web resource:
   - **Name:** crmgp_SalesCommissionScript
   - **Display Name:** Sales Commission Script
   - **Type:** Script (JScript)
   - **Upload File:** Upload `SalesCommissionScript.js`
3. Click **Save** and **Publish**

---

## 3. Add Web Resource to Sales Order Form

### 3.1 Open Sales Order Form

1. Navigate to **Settings** > **Customizations** > **Customize the System**
2. Expand **Entities** > **Order** > **Forms**
3. Open the main form (usually "Order" or "Information")

### 3.2 Add Web Resource Control

1. Click on a section where you want to add the web resource
2. On the **Insert** tab, click **Web Resource**
3. Configure the web resource:
   - **Web Resource:** Select `crmgp_SalesCommissionWebResource`
   - **Name:** IFRAME_SalesCommission
   - **Label:** Sales Commission Layout
   - **Scrolling:** As Necessary
   - **Display border:** No
   - **Number of Rows:** 20 (adjust as needed)
4. Click **OK**
5. Save and Publish the form

---

## 4. Security Configuration

### 4.1 Grant Entity Permissions

Ensure users have the following permissions:

**new_zipcode Entity:**
- Read: Yes
- Create: No (data should be pre-loaded)
- Write: No
- Delete: No

**crmgp_salescommission Entity:**
- Read: Yes
- Create: Yes
- Write: Yes
- Delete: Organization (if needed)

**crmgp_salescommission_audit_trail Entity:**
- Read: Yes
- Create: Yes (system will create)
- Write: No
- Delete: No

### 4.2 Assign Security Roles

Add the appropriate security roles to users who will access the Sales Commission Layout.

---

## 5. Data Population

### 5.1 Load ZIP Code Data

You need to populate the `new_zipcode` entity with territory data for each category (SE, BC, SWC).

**Sample Data Structure:**

| ZIP Code | Territory | Category | User |
|----------|-----------|----------|------|
| 10001 | T001 | SE | John Doe |
| 10002 | T002 | BC | Jane Smith |
| 10003 | T003 | SWC | Bob Johnson |

**Methods to load data:**
1. Excel import
2. Data Import Wizard
3. Bulk import via API
4. Manual entry

---

## 6. Testing

### 6.1 Test Checklist

- [ ] Open a Sales Order record
- [ ] Verify the Sales Commission Layout web resource loads
- [ ] Test panel expand/collapse functionality
- [ ] Enter a territory number manually and verify validation
- [ ] Click the lookup icon and verify the modal opens with DataTables
- [ ] Select a territory from the lookup and verify it populates correctly
- [ ] Check/uncheck override checkboxes
- [ ] Click "Save Commission Data" and verify data is saved
- [ ] Reload the page and verify data persists
- [ ] Make a change and verify audit trail is created
- [ ] Click "View Audit Trail" and verify audit records display

### 6.2 Validation Tests

1. **Territory Validation:**
   - Enter an invalid territory number
   - Verify an error message appears
   - Verify the field reverts to the previous value

2. **Lookup Functionality:**
   - Open the lookup modal
   - Test the search functionality
   - Test pagination
   - Verify record selection works

3. **Data Persistence:**
   - Save commission data
   - Refresh the browser
   - Verify all fields retain their values

4. **Audit Trail:**
   - Make multiple changes to different fields
   - Save the data
   - Open audit trail
   - Verify all changes are logged with correct timestamps and user names

---

## 7. Troubleshooting

### Common Issues:

**Issue:** Web resource doesn't load
**Solution:**
- Verify the web resource is published
- Check browser console for JavaScript errors
- Ensure jQuery and DataTables CDN links are accessible

**Issue:** Territory validation always fails
**Solution:**
- Verify ZIP code data is loaded correctly
- Check category field values match exactly (SE, BC, SWC)
- Ensure territory numbers are exact matches

**Issue:** Lookup modal doesn't show data
**Solution:**
- Verify ZIP code records exist for the category
- Check FetchXML query permissions
- Review browser console for API errors

**Issue:** Audit trail not creating records
**Solution:**
- Verify user has Create permissions on audit entity
- Check that changes are actually being made (not just re-saving same values)
- Review browser console for errors

**Issue:** User names not displaying
**Solution:**
- Verify lookup relationships are configured correctly
- Check user records exist and are active
- Ensure proper permissions to read systemuser entity

---

## 8. Customization Notes

### 8.1 Adding Additional Fields

To add more commission types:

1. Add new fields to `crmgp_salescommission` entity
2. Add new rows in the HTML file
3. Update JavaScript functions:
   - `populateCommissionFields()`
   - `buildCommissionDataObject()`
   - `getFieldPrefixFromApiName()`

### 8.2 Changing Categories

To add or modify categories (SE, BC, SWC):

1. Update the option set in `new_zipcode` entity
2. Add new panel in HTML
3. Update JavaScript to load data for new category
4. Add corresponding fields in `crmgp_salescommission` entity

### 8.3 Styling Modifications

All CSS is embedded in the HTML file. Modify the `<style>` section to change:
- Colors and branding
- Panel layouts
- Table styling
- Modal appearance

---

## 9. Performance Optimization

### 9.1 Large Data Sets

If you have many ZIP code records (>10,000):

1. Consider adding filters to the lookup modal
2. Implement server-side pagination for DataTables
3. Add indexed fields for territory searches

### 9.2 Caching

The solution loads all ZIP code data on page load. For better performance:

1. Implement lazy loading for lookup modals
2. Cache ZIP code data in browser session storage
3. Only reload changed data after save

---

## 10. Maintenance

### 10.1 Regular Tasks

- Review audit trail periodically for unusual activity
- Update ZIP code data as territories change
- Monitor web resource performance
- Keep jQuery and DataTables libraries updated

### 10.2 Backup Recommendations

- Export entity schemas before major changes
- Backup ZIP code data regularly
- Keep copies of customized web resources

---

## 11. Support and Documentation

### Resources:
- Dynamics 365 Web Resources Documentation
- FetchXML Reference
- Xrm.WebApi Documentation
- DataTables Documentation

### Contact:
For issues or questions about this solution, contact your Dynamics 365 administrator.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-03 | Initial release |

---

## Appendix A: FetchXML Queries

### Sample Query: Load Commission Data
```xml
<fetch mapping='logical'>
  <entity name='crmgp_salescommission'>
    <attribute name='crmgp_salescommissionid' />
    <attribute name='crmgp_sespec1zipcode' />
    <!-- Add all other attributes -->
    <filter type='and'>
      <condition attribute='crmgp_salesorder' operator='eq' value='{SALES_ORDER_ID}' />
    </filter>
  </entity>
</fetch>
```

### Sample Query: Load ZIP Codes by Category
```xml
<fetch mapping='logical'>
  <entity name='new_zipcode'>
    <attribute name='new_zipcodeid' />
    <attribute name='new_territory' />
    <attribute name='new_zipcode' />
    <attribute name='_new_userid_value' />
    <filter type='and'>
      <condition attribute='new_category' operator='eq' value='SE' />
    </filter>
  </entity>
</fetch>
```

---

## Appendix B: Entity Relationship Diagram

```
SalesOrder (1) ----< (N) crmgp_salescommission
SalesOrder (1) ----< (N) crmgp_salescommission_audit_trail

crmgp_salescommission (N) >---- (1) new_zipcode [SE Spec1]
crmgp_salescommission (N) >---- (1) new_zipcode [SE Sell1]
crmgp_salescommission (N) >---- (1) new_zipcode [SE Dest]
... (and so on for all 18 lookup fields)

new_zipcode (N) >---- (1) systemuser

crmgp_salescommission_audit_trail (N) >---- (1) systemuser [Changed By]
```

---

**End of Deployment Guide**

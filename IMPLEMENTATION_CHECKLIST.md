# Sales Commission Web Resource - Implementation Checklist

Use this checklist to track your implementation progress.

## Phase 1: Environment Preparation
- [ ] Verify Dynamics 365 environment access
- [ ] Confirm System Administrator or Customizer role
- [ ] Backup existing Sales Order customizations
- [ ] Create development/test instance (recommended)

## Phase 2: Entity Creation

### 2.1 Create new_zipcode Entity
- [ ] Create entity with schema name `new_zipcode`
- [ ] Set ownership to Organization
- [ ] Add field: `new_zipcode` (String, 100)
- [ ] Add field: `new_territory` (String, 50)
- [ ] Add field: `new_category` (Option Set: SE=1, BC=2, SWC=3)
- [ ] Add field: `new_userid` (Lookup to systemuser)
- [ ] Save and Publish entity

### 2.2 Create crmgp_salescommission Entity
- [ ] Create entity with schema name `crmgp_salescommission`
- [ ] Set ownership to Organization
- [ ] Add field: `crmgp_salesorder` (Lookup to salesorder)

**SE Fields:**
- [ ] Add field: `crmgp_sespec1zipcode` (Lookup to new_zipcode)
- [ ] Add field: `crmgp_sesell1zipcode` (Lookup to new_zipcode)
- [ ] Add field: `crmgp_sedestzipcode` (Lookup to new_zipcode)
- [ ] Add field: `crmgp_sespec2zipcode` (Lookup to new_zipcode)
- [ ] Add field: `crmgp_sesell2zipcode` (Lookup to new_zipcode)
- [ ] Add field: `crmgp_sespec30zipcode` (Lookup to new_zipcode)
- [ ] Add field: `crmgp_sespec1override` (Two Options/Boolean)
- [ ] Add field: `crmgp_sesell1override` (Two Options/Boolean)
- [ ] Add field: `crmgp_sedestoverride` (Two Options/Boolean)
- [ ] Add field: `crmgp_sespec2override` (Two Options/Boolean)
- [ ] Add field: `crmgp_sesell2override` (Two Options/Boolean)
- [ ] Add field: `crmgp_sespec30override` (Two Options/Boolean)

**BC Fields:**
- [ ] Add field: `crmgp_bcspec1zipcode` (Lookup to new_zipcode)
- [ ] Add field: `crmgp_bcsell1zipcode` (Lookup to new_zipcode)
- [ ] Add field: `crmgp_bcdest1zipcode` (Lookup to new_zipcode)
- [ ] Add field: `crmgp_bcspec2zipcode` (Lookup to new_zipcode)
- [ ] Add field: `crmgp_bcsell2zipcode` (Lookup to new_zipcode)
- [ ] Add field: `crmgp_bcspec30zipcode` (Lookup to new_zipcode)
- [ ] Add field: `crmgp_bcspec1override` (Two Options/Boolean)
- [ ] Add field: `crmgp_bcsell1override` (Two Options/Boolean)
- [ ] Add field: `crmgp_bcdestoverride` (Two Options/Boolean)
- [ ] Add field: `crmgp_bcspec2override` (Two Options/Boolean)
- [ ] Add field: `crmgp_bcsell2override` (Two Options/Boolean)
- [ ] Add field: `crmgp_bcspec30override` (Two Options/Boolean)

**SWC Fields:**
- [ ] Add field: `crmgp_swcspec1zipcode` (Lookup to new_zipcode)
- [ ] Add field: `crmgp_swcsell1zipcode` (Lookup to new_zipcode)
- [ ] Add field: `crmgp_swcdest1zipcode` (Lookup to new_zipcode)
- [ ] Add field: `crmgp_swcspec2zipcode` (Lookup to new_zipcode)
- [ ] Add field: `crmgp_swcsell2zipcode` (Lookup to new_zipcode)
- [ ] Add field: `crmgp_swcspec30zipcode` (Lookup to new_zipcode)
- [ ] Add field: `crmgp_swcspec1override` (Two Options/Boolean)
- [ ] Add field: `crmgp_swcsell1override` (Two Options/Boolean)
- [ ] Add field: `crmgp_swcdestoverride` (Two Options/Boolean)
- [ ] Add field: `crmgp_swcspec2override` (Two Options/Boolean)
- [ ] Add field: `crmgp_swcsell2override` (Two Options/Boolean)
- [ ] Add field: `crmgp_swcspec30override` (Two Options/Boolean)

- [ ] Save and Publish entity

### 2.3 Create crmgp_salescommission_audit_trail Entity
- [ ] Create entity with schema name `crmgp_salescommission_audit_trail`
- [ ] Set ownership to Organization
- [ ] Add field: `crmgp_salesorder` (Lookup to salesorder)
- [ ] Add field: `crmgp_changedby` (Lookup to systemuser)
- [ ] Add field: `crmgp_changedate` (Date Time)
- [ ] Add field: `crmgp_fieldname` (String, 100)
- [ ] Add field: `crmgp_oldterritory` (String, 50)
- [ ] Add field: `crmgp_olduser` (String, 200)
- [ ] Add field: `crmgp_newterritory` (String, 50)
- [ ] Add field: `crmgp_newuser` (String, 200)
- [ ] Save and Publish entity

## Phase 3: Web Resource Deployment

### 3.1 Create HTML Web Resource
- [ ] Navigate to Settings > Customizations > Customize the System
- [ ] Go to Web Resources
- [ ] Click New
- [ ] Name: `crmgp_SalesCommissionWebResource`
- [ ] Display Name: `Sales Commission Layout`
- [ ] Type: Web Page (HTML)
- [ ] Upload: `SalesCommissionWebResource.html`
- [ ] Save
- [ ] Publish

### 3.2 Create JavaScript Web Resource
- [ ] Click New to create another web resource
- [ ] Name: `crmgp_SalesCommissionScript`
- [ ] Display Name: `Sales Commission Script`
- [ ] Type: Script (JScript)
- [ ] Upload: `SalesCommissionScript.js`
- [ ] Save
- [ ] Publish

## Phase 4: Sales Order Form Customization

- [ ] Navigate to Settings > Customizations > Customize the System
- [ ] Expand Entities > Order > Forms
- [ ] Open the main Sales Order form
- [ ] Add a new Tab (optional) or Section
- [ ] Insert Web Resource control
- [ ] Select `crmgp_SalesCommissionWebResource`
- [ ] Set properties:
  - [ ] Name: `IFRAME_SalesCommission`
  - [ ] Label: `Sales Commission Layout`
  - [ ] Rows: 20
  - [ ] Scrolling: As Necessary
  - [ ] Display border: No
- [ ] Save the form
- [ ] Publish the form

## Phase 5: Security Configuration

### 5.1 Configure Entity Security
- [ ] Navigate to Settings > Security > Security Roles
- [ ] Select appropriate role(s)

**For new_zipcode:**
- [ ] Read: Business Unit or Organization
- [ ] Create: None (pre-loaded data)
- [ ] Write: None
- [ ] Delete: None

**For crmgp_salescommission:**
- [ ] Read: Business Unit or Organization
- [ ] Create: Business Unit
- [ ] Write: Business Unit
- [ ] Delete: Business Unit (optional)

**For crmgp_salescommission_audit_trail:**
- [ ] Read: Business Unit or Organization
- [ ] Create: Organization (system creates)
- [ ] Write: None
- [ ] Delete: None

- [ ] Save security role changes

### 5.2 Assign Users
- [ ] Navigate to Settings > Security > Users
- [ ] Assign appropriate security roles to users

## Phase 6: Data Population

### 6.1 Prepare ZIP Code Data
- [ ] Review `SampleZipCodeData.csv` format
- [ ] Prepare your actual territory data
- [ ] Map territories to categories (SE, BC, SWC)
- [ ] Map territories to system users

### 6.2 Import ZIP Code Data
- [ ] Navigate to Settings > Data Management > Imports
- [ ] Click Import Data
- [ ] Upload your ZIP code CSV file
- [ ] Map columns:
  - [ ] ZIP Code → new_zipcode
  - [ ] Territory → new_territory
  - [ ] Category → new_category (SE=1, BC=2, SWC=3)
  - [ ] User → new_userid (map to system user by email)
- [ ] Submit import
- [ ] Verify import completed successfully
- [ ] Review imported records

## Phase 7: Testing

### 7.1 Basic Functionality Tests
- [ ] Open a Sales Order record
- [ ] Verify web resource loads without errors
- [ ] Check browser console for JavaScript errors
- [ ] Verify all three panels (SE, BC, SWC) are visible

### 7.2 Territory Entry Tests
- [ ] Manually enter a valid territory number
- [ ] Tab out of field
- [ ] Verify username auto-populates
- [ ] Enter an invalid territory number
- [ ] Verify error message appears
- [ ] Verify field reverts to previous value

### 7.3 Lookup Functionality Tests
- [ ] Click a lookup (🔍) button
- [ ] Verify modal opens
- [ ] Verify DataTable displays ZIP code records
- [ ] Test search functionality
- [ ] Test pagination (if >10 records)
- [ ] Select a record
- [ ] Verify modal closes
- [ ] Verify territory and user populate correctly

### 7.4 Override Tests
- [ ] Check an override checkbox
- [ ] Save commission data
- [ ] Reload the page
- [ ] Verify override checkbox state persists

### 7.5 Save Functionality Tests
- [ ] Enter data in multiple fields across all panels
- [ ] Click "Save Commission Data"
- [ ] Verify success message appears
- [ ] Refresh the browser
- [ ] Verify all data persists

### 7.6 Audit Trail Tests
- [ ] Make a change to a territory assignment
- [ ] Save commission data
- [ ] Click "View Audit Trail"
- [ ] Verify modal opens
- [ ] Verify audit record exists with:
  - [ ] Correct user name
  - [ ] Correct timestamp
  - [ ] Correct field name
  - [ ] Correct old and new values

### 7.7 Panel Auto-Expand Tests
- [ ] Clear all data
- [ ] Reload the page
- [ ] Verify all panels are collapsed
- [ ] Add data to SE panel only
- [ ] Reload the page
- [ ] Verify SE panel is expanded
- [ ] Verify BC and SWC panels are collapsed

### 7.8 Cross-Browser Tests
- [ ] Test in Chrome
- [ ] Test in Edge
- [ ] Test in Firefox
- [ ] Test in Safari (if available)

## Phase 8: User Acceptance Testing (UAT)

- [ ] Provide training to end users
- [ ] Document test scenarios
- [ ] Have users perform real-world tasks
- [ ] Collect feedback
- [ ] Address any issues or concerns

## Phase 9: Production Deployment

### 9.1 Pre-Deployment
- [ ] Backup production environment
- [ ] Create deployment plan
- [ ] Schedule deployment window
- [ ] Notify users of deployment

### 9.2 Deployment
- [ ] Export solution from dev/test environment
- [ ] Import solution to production
- [ ] Verify all entities created correctly
- [ ] Verify all web resources uploaded
- [ ] Verify form customizations applied
- [ ] Configure security roles
- [ ] Import ZIP code data
- [ ] Publish all customizations

### 9.3 Post-Deployment
- [ ] Perform smoke tests
- [ ] Verify web resource loads
- [ ] Test basic functionality
- [ ] Monitor for errors
- [ ] Provide user support

## Phase 10: Documentation and Training

- [ ] Document entity schemas
- [ ] Document security model
- [ ] Create user guide
- [ ] Create administrator guide
- [ ] Conduct user training sessions
- [ ] Record training video (optional)
- [ ] Create FAQ document

## Phase 11: Ongoing Maintenance

- [ ] Schedule regular data reviews
- [ ] Update ZIP code data as territories change
- [ ] Monitor audit trail for unusual activity
- [ ] Review and optimize performance
- [ ] Plan for future enhancements

## Success Criteria

- [ ] All entities created and configured correctly
- [ ] Web resources deployed and functional
- [ ] Sales Order form displays commission layout
- [ ] Users can enter and validate territories
- [ ] Lookup functionality works across all categories
- [ ] Data saves and persists correctly
- [ ] Audit trail captures all changes
- [ ] No console errors or warnings
- [ ] Users trained and comfortable with the interface
- [ ] Performance is acceptable (<3 seconds load time)

## Rollback Plan

In case of issues:
- [ ] Document rollback procedure
- [ ] Export backup solution before deployment
- [ ] Have rollback authorization process
- [ ] Test rollback in non-production environment

## Notes

**Estimated Time to Deploy:**
- Phase 1-2 (Entity Creation): 2-3 hours
- Phase 3-4 (Web Resources & Form): 1 hour
- Phase 5 (Security): 30 minutes
- Phase 6 (Data Import): 1-2 hours (depends on data volume)
- Phase 7 (Testing): 2-3 hours
- **Total: 6-10 hours**

**Key Contacts:**
- Dynamics 365 Administrator: _______________
- Project Sponsor: _______________
- Technical Lead: _______________
- End User Representative: _______________

**Important Dates:**
- Development Start: _______________
- Testing Start: _______________
- UAT Start: _______________
- Production Deployment: _______________
- Go-Live: _______________

---

**Checklist Completion Date:** _______________
**Deployed By:** _______________
**Approved By:** _______________

# Sales Commission Web Resource for Dynamics 365

## Overview

This solution provides a comprehensive sales commission management interface for Dynamics 365, allowing users to efficiently manage commission assignments across three categories: SE (Specification & Engineering), BC (Building Components), and SWC (Specialty Wood Components).

## Features

- **Three-Panel Interface**: Organized panels for SE, BC, and SWC commission categories
- **Territory Management**: Input and validate territory numbers with automatic user population
- **Advanced Lookup**: DataTables-powered search functionality for ZIP code-based territory selection
- **Override Controls**: Checkbox controls for commission assignment overrides
- **Auto Expand/Collapse**: Panels automatically expand when they contain data
- **Audit Trail**: Complete history of all commission assignment changes
- **Territory Validation**: Real-time validation against preloaded ZIP code datasets
- **Responsive Design**: Clean, modern interface built with Bootstrap principles

## Commission Types

Each category (SE, BC, SWC) supports the following commission assignment types:

1. **Spec1** - Primary Specification Role
2. **Sell1** - Primary Selling Role
3. **Dest1** - Destination Role
4. **Spec2** - Secondary Specification Role
5. **Sell2** - Secondary Selling Role
6. **Spec 30%** - Specification 30% Split Role

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES5)
- **Libraries**:
  - jQuery 3.6.0
  - DataTables 1.11.5
- **Backend**: Dynamics 365 CE
- **API**: Xrm.WebApi, FetchXML
- **Data Storage**: Dynamics 365 Entities

## Repository Structure

```
Sales-Commission/
├── SalesCommissionWebResource.html    # Main HTML web resource
├── SalesCommissionScript.js           # JavaScript functionality
├── DEPLOYMENT_GUIDE.md                # Comprehensive deployment instructions
├── EntityCreationScript.xml           # Entity structure reference
├── SampleZipCodeData.csv              # Sample ZIP code data template
└── README.md                          # This file
```

## Quick Start

### Prerequisites

- Dynamics 365 environment (Online or On-Premises)
- System Administrator or System Customizer role
- Modern web browser (Chrome, Edge, Firefox)

### Installation Steps

1. **Create Entities** (see DEPLOYMENT_GUIDE.md section 1)
   - new_zipcode
   - crmgp_salescommission
   - crmgp_salescommission_audit_trail

2. **Upload Web Resources** (see DEPLOYMENT_GUIDE.md section 2)
   - SalesCommissionWebResource.html
   - SalesCommissionScript.js

3. **Add to Sales Order Form** (see DEPLOYMENT_GUIDE.md section 3)
   - Insert web resource control
   - Configure size and properties

4. **Configure Security** (see DEPLOYMENT_GUIDE.md section 4)
   - Set entity permissions
   - Assign security roles

5. **Load ZIP Code Data** (see DEPLOYMENT_GUIDE.md section 5)
   - Import territory and user mappings
   - Populate for all three categories (SE, BC, SWC)

6. **Test** (see DEPLOYMENT_GUIDE.md section 6)
   - Validate all functionality
   - Verify data persistence
   - Check audit trail

## Usage

### Basic Workflow

1. **Open a Sales Order** in Dynamics 365
2. **Navigate** to the Sales Commission Layout section
3. **Enter Territory Numbers** manually or use the lookup (🔍) button
4. **Verify** that usernames auto-populate correctly
5. **Set Override Flags** if commission assignment overrides are needed
6. **Save** commission data using the "Save Commission Data" button
7. **Review Changes** using the "View Audit Trail" button

### Territory Entry Methods

**Manual Entry:**
- Type the territory number directly into the input field
- Press Tab or click outside the field
- System validates against ZIP code data
- Username auto-populates if territory is valid

**Lookup Search:**
- Click the 🔍 button next to any territory field
- Search and filter using the DataTables interface
- Select the desired territory from the results
- Territory and username auto-populate

## Entity Relationships

```
SalesOrder (1) ----< (N) crmgp_salescommission
                   - SE Spec1 Zipcode → new_zipcode → systemuser
                   - SE Sell1 Zipcode → new_zipcode → systemuser
                   - SE Dest Zipcode → new_zipcode → systemuser
                   - SE Spec2 Zipcode → new_zipcode → systemuser
                   - SE Sell2 Zipcode → new_zipcode → systemuser
                   - SE Spec30 Zipcode → new_zipcode → systemuser
                   (Same structure for BC and SWC)

SalesOrder (1) ----< (N) crmgp_salescommission_audit_trail
                   - Changed By → systemuser
```

## Data Model

### new_zipcode
Stores territory-to-user mappings by category
- Territory Number
- ZIP Code
- Category (SE/BC/SWC)
- User Reference

### crmgp_salescommission
Stores commission assignments for each sales order
- 18 ZIP code lookups (6 per category)
- 18 override flags (6 per category)
- Sales Order reference

### crmgp_salescommission_audit_trail
Tracks all changes to commission assignments
- Changed By (user)
- Change Date (timestamp)
- Field Name
- Old Territory & User
- New Territory & User

## Customization

### Adding New Commission Types

To add additional commission types beyond the current 6:

1. Add new lookup field to `crmgp_salescommission` entity
2. Add new boolean field for override
3. Add new table row in HTML for each category panel
4. Update JavaScript functions for data loading and saving

### Changing Category Names

To rename categories (e.g., SE → Engineering):

1. Update option set in `new_zipcode` entity
2. Update panel headers in HTML
3. Update CSS class names if needed
4. Update JavaScript category references

### Styling Modifications

All styles are in the `<style>` section of the HTML file:
- Modify colors by changing hex values
- Adjust panel sizing
- Update fonts and spacing
- Change button styles

## Troubleshooting

### Common Issues

**Problem**: Web resource shows blank page
**Solution**: Check browser console for errors, verify jQuery and DataTables CDN links

**Problem**: Territory validation always fails
**Solution**: Ensure ZIP code data is loaded with exact category values (SE, BC, SWC)

**Problem**: Usernames don't display
**Solution**: Verify lookup relationships are created correctly in entity configuration

**Problem**: Save button doesn't work
**Solution**: Check user permissions on crmgp_salescommission entity

**Problem**: Audit trail is empty
**Solution**: Verify changes are being made (not re-saving same data)

See DEPLOYMENT_GUIDE.md Section 7 for detailed troubleshooting steps.

## Browser Support

- ✅ Google Chrome (latest)
- ✅ Microsoft Edge (latest)
- ✅ Mozilla Firefox (latest)
- ✅ Safari (latest)
- ⚠️ Internet Explorer 11 (limited support)

## Performance Considerations

- ZIP code data loads once on page initialization
- DataTables provides client-side pagination and search
- FetchXML queries are optimized with specific attribute selection
- Audit records are created asynchronously

For environments with >10,000 ZIP code records, consider implementing server-side pagination.

## Security

- All data access uses Dynamics 365 security roles
- User permissions are enforced at the entity level
- Audit trail captures all user changes with timestamps
- No data is stored outside Dynamics 365

## Version Compatibility

- Dynamics 365 Version: 9.0+
- Xrm.WebApi: Version 9.0+
- jQuery: 3.6.0
- DataTables: 1.11.5

## Support

For detailed implementation guidance, see:
- **DEPLOYMENT_GUIDE.md** - Complete deployment instructions
- **EntityCreationScript.xml** - Entity structure reference

## License

This solution is provided as-is for use within your Dynamics 365 environment.

## Contributors

Developed for sales commission management in Dynamics 365.

## Changelog

### Version 1.0.0 (2025-12-03)
- Initial release
- Three-category commission management (SE, BC, SWC)
- Six commission types per category
- Territory validation and lookup
- Audit trail functionality
- Auto-expand panels
- DataTables integration

## Roadmap

Potential future enhancements:
- Export commission data to Excel
- Bulk territory assignment
- Commission calculation preview
- Historical reporting dashboard
- Mobile-responsive improvements
- Multi-language support

## Contact

For questions or support, contact your Dynamics 365 administrator.

---

**Last Updated**: December 3, 2025
**Version**: 1.0.0

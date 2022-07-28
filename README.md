# bin-location
Utility for Bin Location Maintenance.

---

## Usage

### Bin Location Format
- Bin Locations should be formatted as: {AISLE}{SIDE}{COLUMN}, example: 6A5
- Additional locations can follow primary bin location
- Last, additional text
- example: '**6A1 NW17**' *(8 characters)*
- *Remember: the bin location field is only 10 characters, spaces included.*

### Top Form
- Warehouse Code - limit the data loaded by warehouse (or not)
- Item Code - limit the data loaded by Item Code, use % as a wildcard
- Bin Location - limit the data loaded by Bin Location.

### Middle Form
- filter: searches the Item Code, Description and Bin Location for entered text
- find/replace: looks for text in the Bin Location field and replaces it.

---

### Additional Notes

- On mobile devices, swiping a row right will move one bin to the right, swipe left will move one bin the left
- Find and replace is available if rows are selected on the left


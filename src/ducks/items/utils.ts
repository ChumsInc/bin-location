import {SortProps} from "@chumsinc/sortable-tables";
import {EditableBinLocation} from "@/types/bin-location";
import {itemKey} from "@/utils/bin-location";


export const binLocationSorter = (sort: SortProps<EditableBinLocation>) => (a: EditableBinLocation, b: EditableBinLocation) => {
    const sortMod = sort.ascending ? 1 : -1;
    switch (sort.field) {
    case "ItemCode":
    case 'WarehouseCode':
        return (
            a[sort.field].toLowerCase() === b[sort.field].toLowerCase()
                ? (itemKey(a).localeCompare(itemKey(b)))
                : (a[sort.field].toLowerCase() > b[sort.field].toLowerCase() ? 1 : -1)
        ) * sortMod
    case "BinLocation":
    case 'ItemCodeDesc':
    case 'SalesUnitOfMeasure':
        return (
            (a[sort.field] ?? '').toLowerCase() === (b[sort.field] ?? '').toLowerCase()
                ? (itemKey(a).localeCompare(itemKey(b)))
                : ((a[sort.field] || '').toLowerCase() > (b[sort.field] || '').toLowerCase() ? 1 : -1)
        ) * sortMod
    case 'changed':
    case 'selected':
        return (
            (a[sort.field] ? 1 : 0) === (b[sort.field] ? 1 : 0)
                ? (itemKey(a).localeCompare(itemKey(b)))
                : ((a[sort.field] ? 1 : 0) > (b[sort.field] ? 1 : 0) ? 1 : -1)
        ) * sortMod
    default:
        return (itemKey(a).localeCompare(itemKey(b))) * sortMod
    }
}


const binParser = /([0-9]+)([AB])([0-9]+)/i;

export class SwipeableBinLocation {
    aisle: string = '';
    side: 'A' | 'B' | null = null;
    section: string = '';

    constructor(aisle: string, side: 'A' | 'B', section: string) {
        this.aisle = aisle;
        this.side = side;
        this.section = section;
    }

    static parse(location: string): SwipeableBinLocation | null {
        if (!binParser.test(location)) {
            return null;
        }
        const [full, aisle, side, section] = binParser.exec(location) || [];
        if (!aisle || !side || !section) {
            return null;
        }
        if (side !== 'A' && side !== 'B') {
            return null;
        }
        return new SwipeableBinLocation(aisle, side, section);
    }

    swipeHandler(direction: 1 | -1) {
        if (this.side === 'A') {
            direction *= -1;
        }
        let newSection = Number(this.section) + direction;
        if (newSection === 0) {
            return;
        }
        this.section = String(newSection);
    }

    onSwipeLeft() {
        this.swipeHandler(-1)
    }

    onSwipeRight() {
        this.swipeHandler(1);
    }

    toString() {
        return `${this.aisle}${this.side}${this.section}`;
    }

    static locations(): string[] {
        return this.toString()
            .trim()
            .replace(/\s+/, ' ')
            .split(' ');
    }
}

export const parseBinLocations = (binLocation?: string):string[] => {
    return (binLocation ?? '').trim()
        .replace(/\s+/, ' ')
        .split(' ');
}

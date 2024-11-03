const dataElementSeeds = [
    {
        code: "2",
        name: "destination factory code", 
        description: 'Code of the factory where the goods will be delivered. For purchase orders with prefixes ending in: - "P": use code "028" - "T": use code "081" - "C": use code "010"', 
        usage: "mandatory", 
        fixed_length: 3,
        minimum_length: 3, 
        maximum_length: 3, 
        possible_values: ".{3}"
    },
    {
        code: "3",
        name: "current schedule identification", 
        description: 'Identification of the current part number/material schedule issued by the customer, that will keep unaltered until a new schedule is issued.', 
        usage: "mandatory", 
        fixed_length: 9,
        minimum_length: 9, 
        maximum_length: 9, 
        possible_values: ".{9}"
    },
    {
        code: "4",
        name: "current schedule date", 
        description: 'Issue date of the current part number/material scheduled issued by the customer.', 
        usage: "mandatory", 
        fixed_length: 6,
        minimum_length: 6, 
        maximum_length: 6, 
        possible_values: "(\\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\\d|30|31)"
    },
    {
        code: "5",
        name: "previous schedule identif.",
        description: 'Identification of the previous part number/material schedule issued by the customer.',
        usage: "optional",
        fixed_length: 9,
        minimum_length: 9,
        maximum_length: 9,
        possible_values: ".{9}"
    },
    {
        code: "6",
        name: "previous schedule date", 
        description: 'Issue date of the previous part number/material schedule issued by the customer.', 
        usage: "optional", 
        fixed_length: 6,
        minimum_length: 6, 
        maximum_length: 6, 
        possible_values: "((\\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\\d|30|31)|0{6})"
    },
    {
        code: "7",
        name: "customer part number code", 
        description: 'Internal code assigned by the customer for the items that they acquire from the supplier.', 
        usage: "mandatory", 
        fixed_length: 30,
        minimum_length: 30, 
        maximum_length: 30, 
        possible_values: ".{30}"
    },
    {
        code: "8",
        name: "supplier part number code", 
        description: 'Internal code assigned by the supplier for the items that they supply to the customer.', 
        usage: "optional", 
        fixed_length: 30,
        minimum_length: 30, 
        maximum_length: 30, 
        possible_values: ".{30}"
    },
    {
        code: "9",
        name: "purchase order number", 
        description: 'Number of the purchase order/supply contract of items, issued by the customer. The number of the purchase order has 9 characters, 4 alphanumerical and 5 numeric. The last three indicate the purchase order type.', 
        usage: "mandatory", 
        fixed_length: 12,
        minimum_length: 12, 
        maximum_length: 12, 
        possible_values: ".{12}"
    },
    {
        code: "10",
        name: "target location code", 
        description: 'Customer destination location code, where the items will be delivered. This code must be aligned between customer and supplier.', 
        usage: "optional", 
        fixed_length: 5,
        minimum_length: 5, 
        maximum_length: 5, 
        possible_values: ".{5}"
    },
    {
        code: "11",
        name: "contact identification", 
        description: 'Identification of the responsible person for contact.', 
        usage: "optional", 
        fixed_length: 11,
        minimum_length: 11, 
        maximum_length: 11, 
        possible_values: ".{11}"
    },
    {
        code: "12",
        name: "last delivery/shipment date",
        description: 'Date of the last delivery/shipment of the item made from the supplier to the customer.',
        usage: "optional",
        fixed_length: 6,
        minimum_length: 6,
        maximum_length: 6,
        possible_values: "(\\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\\d|30|31)"
    },
    {
        code: "14",
        name: "last nota fiscal date", 
        description: 'Issue date of the nota fiscal related to the last shipment/ /delivery of the item made from the supplier to the customer.', 
        usage: "optional", 
        fixed_length: 6,
        minimum_length: 6, 
        maximum_length: 6, 
        possible_values: "(\\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\\d|30|31)"
    },
    {
        code: "15",
        name: "last shipment/delivery quantity",
        description: 'Quantity of the last delivery/shipment of the item made from the supplier to the customer.',
        usage: "optional",
        fixed_length: 12,
        minimum_length: 12,
        maximum_length: 12,
        possible_values: "[0-9 ]{12}"
    },
    {
        code: "16",
        name: "cumulative deliv./ship. qty.",
        description: 'Cumulative quantity of the item delivered/shipped from a determined date until the date of the last delivery/shipment.',
        usage: "optional",
        fixed_length: 14,
        minimum_length: 14,
        maximum_length: 14,
        possible_values: "\\d{14}"
    },
    {
        code: "17",
        name: "cumulative required qty", 
        description: 'Cumulative quantity required by the customer from a determined date until the message date.', 
        usage: "optional", 
        fixed_length: 14,
        minimum_length: 14, 
        maximum_length: 14, 
        possible_values: "\\d{14}"
    },
    {
        code: "18",
        name: "minimum batch quantity", 
        description: 'Minimum batch quantity of the item to be delivered/shipped at once from the supplier to the customer.', 
        usage: "optional", 
        fixed_length: 12,
        minimum_length: 12, 
        maximum_length: 12, 
        possible_values: "[0-9 ]{12}"
    },
    {
        code: "19",
        name: "unit of measurement code", 
        description: 'Agreed item unit of measurement code. Exs: KG, LT, PC, MT, etc.', 
        usage: "mandatory", 
        fixed_length: 2,
        minimum_length: 2, 
        maximum_length: 2, 
        possible_values: ".{2}"
    },
    {
        code: "20",
        name: "supply frequency code", 
        description: 'Code that indicates the supply frequency of the item. This code must be aligned between the customer and the supplier.', 
        usage: "optional", 
        fixed_length: 3,
        minimum_length: 3, 
        maximum_length: 3, 
        possible_values: ".{3}"
    },
    {
        code: "21",
        name: "unloading point code", 
        description: 'Code of the unloading point in the customer.', 
        usage: "optional", 
        fixed_length: 7,
        minimum_length: 7, 
        maximum_length: 7, 
        possible_values: ".{7}"
    },
    {
        code: "22",
        name: "number of decimal places", 
        description: 'Number of decimal places used in certain segments.', 
        usage: "mandatory", 
        fixed_length: 1,
        minimum_length: 1, 
        maximum_length: 1, 
        possible_values: "[0-9 ]{1}"
    },
    {
        code: "23",
        name: "delivery/shipment window",
        description: 'Identifies the period defined by the customer for receiving the itens. The first two positions indicate the initial hour and the last two positions the final hour.',
        usage: "optional",
        fixed_length: 4,
        minimum_length: 4,
        maximum_length: 4,
        possible_values: "([0-1]\\d|2[0-3])([0-1]\\d|2[0-3])"
    },
    {
        code: "24",
        name: "item delivery/shipment date",
        description: 'Date for the delivery/shipment of the item. When this field does not contain a date, its contents must be aligned between the  parties.',
        usage: "mandatory",
        fixed_length: 6,
        minimum_length: 6,
        maximum_length: 6,
        possible_values: "(0{6}|2{6}|3{6}|4{6}|5{6}|(\\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\\d|30|31))"
    },
    {
        code: "25",
        name: "item delivery/shipment quantity",
        description: 'Item quantity for delivery/shipment. This field is associated with the data elements PE1-13-0022 (number of decimal places) and the previous PE3 data element 24 (delivery date).',
        usage: "mandatory",
        fixed_length: 9,
        minimum_length: 9,
        maximum_length: 9,
        possible_values: "\\d{9}"
    },
    {
        code: "26",
        name: "customer secondary package id", 
        description: 'Identification assigned by the customer for the packages to be used in the item supply. Example: pallet, container, etc.', 
        usage: "optional", 
        fixed_length: 30,
        minimum_length: 30, 
        maximum_length: 30, 
        possible_values: ".{30}"
    },
    {
        code: "27",
        name: "supplier secondary package id", 
        description: 'Identification assigned by the supplier for the packages to be used in the item supply. Example: pallet, container, etc.', 
        usage: "optional", 
        fixed_length: 30,
        minimum_length: 30, 
        maximum_length: 30, 
        possible_values: ".{30}"
    },
    {
        code: "28",
        name: "customer secondary pac. capac.",
        description: 'The number of primary packages to be conditioned in a primary package. Example: the number of boxes in a pallet.',
        usage: "optional",
        fixed_length: 12,
        minimum_length: 12,
        maximum_length: 12,
        possible_values: "[0-9 ]{12}"
    },
    {
        code: "28",
        name: "secondary package capacity", 
        description: 'The number of primary packages to be conditioned in a secondary package. Example: the number of boxes in a pallet.', 
        usage: "optional", 
        fixed_length: 12,
        minimum_length: 12, 
        maximum_length: 12, 
        possible_values: "[0-9 ]{12}"
    },
    {
        code: "29",
        name: "free informative text", 
        description: 'Message in free text format', 
        usage: "mandatory", 
        fixed_length: 40,
        minimum_length: 40, 
        maximum_length: 40, 
        possible_values: ".{40}"
    },
    {
        code: "29",
        name: "free informative text", 
        description: 'Message in free text format', 
        usage: "optional", 
        fixed_length: 40,
        minimum_length: 40, 
        maximum_length: 40, 
        possible_values: ".{40}"
    },
    {
        code: "30",
        name: "production clearance date", 
        description: 'Date (MMYY) until the quantities informed in the message are cleared for production with the commitment of the customer with the supplier', 
        usage: "optional", 
        fixed_length: 4,
        minimum_length: 4, 
        maximum_length: 4, 
        possible_values: "(\\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\\d|30|31)"
    },
    {
        code: "31",
        name: "raw material clearance date", 
        description: 'End date (MMYY) that can be used by the supplier as reference for the acquisition of raw material, subject to modifications by the customer.', 
        usage: "optional", 
        fixed_length: 4,
        minimum_length: 4, 
        maximum_length: 4, 
        possible_values: "(\\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\\d|30|31)"
    },
    {
        code: "33",
        name: "message type identification", 
        description: 'Number that identifies the message type, that must be defined by the responsible committee', 
        usage: "mandatory", 
        fixed_length: 3,
        minimum_length: 3, 
        maximum_length: 3, 
        possible_values: "\\d{3}"
    },
    {
        code: "34",
        name: "message version number", 
        description: 'Number of the version of the message type that must obey the item 2.3 (change log) of the message type.', 
        usage: "mandatory", 
        fixed_length: 2,
        minimum_length: 2, 
        maximum_length: 2, 
        possible_values: "\\d{2}"
    },
    {
        code: "35",
        name: "message creation date/time",
        description: 'Message creation date time (YYMMDDHHmmSS format)',
        usage: "mandatory",
        fixed_length: 12,
        minimum_length: 12,
        maximum_length: 12,
        possible_values: "(\\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\\d|30|31)([0-1]\\d|2[0-3])([0-5]\\d)([0-5]\\d)"
    },
    {
        code: "36",
        name: "transmission control number", 
        description: 'Controle number inside the communication transaction, assigned by the sender. Sequential number, for each transmission and for each reception.', 
        usage: "optional", 
        fixed_length: 5,
        minimum_length: 5, 
        maximum_length: 5, 
        possible_values: "[0-9 ]{5}"
    },
    {
        code: "37",
        name: "sender identification", 
        description: 'Identifies the sender in the communication, usually represented by its CNPJ number (Brazilian VAT number)', 
        usage: "mandatory", 
        fixed_length: 14,
        minimum_length: 14, 
        maximum_length: 14, 
        possible_values: "[0-9 ]{14}"
    },
    {
        code: "38",
        name: "receiver identification", 
        description: 'Identifies the receiver in the communication, usually represented by its their CNPJ number (Brazilian VAT number)', 
        usage: "optional", 
        fixed_length: 14,
        minimum_length: 14, 
        maximum_length: 14, 
        possible_values: ".{14}"
    },
    {
        code: "39",
        name: "number of segments", 
        description: 'Number of segments in the message, including the ITP and FTP segments.', 
        usage: "mandatory", 
        fixed_length: 9,
        minimum_length: 9, 
        maximum_length: 9, 
        possible_values: "[0-9 ]{9}"
    },
    {
        code: "40",
        name: "item delivery/shipment time",
        description: 'Time (HH) for the delivery/shipment of the item, defined by the customer.',
        usage: "optional",
        fixed_length: 2,
        minimum_length: 2,
        maximum_length: 2,
        possible_values: "([0-1]\\d|2[0-3])"
    },
    {
        code: "41",
        name: "supplier primary package id", 
        description: 'Identification assigned by the supplier for the packages to be directly in the item. Example: box, barrel, roll, load, etc.', 
        usage: "optional", 
        fixed_length: 30,
        minimum_length: 30, 
        maximum_length: 30, 
        possible_values: ".{30}"
    },
    {
        code: "69",
        name: "responsible party for package", 
        description: 'Code that identifies the responsible party for supplying the package ("F" for supplier, "C" for customer)', 
        usage: "optional", 
        fixed_length: 1,
        minimum_length: 1, 
        maximum_length: 1, 
        possible_values: ".{1}"
    },
    {
        code: "72",
        name: "supplier primary pack. capacity",
        description: 'The number of item that can be conditioned in a primary package.',
        usage: "optional",
        fixed_length: 12,
        minimum_length: 12,
        maximum_length: 12,
        possible_values: "[0-9 ]{12}"
    },
    {
        code: "74",
        name: "type of supply code", 
        description: 'Code issued by the customer that identifies the use of the item. - "P": production - "R": replacement parts (OEM) - "T": triangulation - "E": exportation - "X": others - "A": sample - "F": tools and solutions', 
        usage: "mandatory", 
        fixed_length: 1,
        minimum_length: 1, 
        maximum_length: 1, 
        possible_values: ".{1}"
    },
    {
        code: "113",
        name: "transport route code", 
        description: 'Code that identifies the transport route.', 
        usage: "optional", 
        fixed_length: 3,
        minimum_length: 3, 
        maximum_length: 3, 
        possible_values: ".{3}"
    },
    {
        code: "151",
        name: "sender internal code", 
        description: 'Internal code by which the sender is recognized by the receiver.', 
        usage: "optional", 
        fixed_length: 8,
        minimum_length: 8, 
        maximum_length: 8, 
        possible_values: ".{8}"
    },
    {
        code: "152",
        name: "receiver internal code", 
        description: 'Internal code by which the receiver is recognized by the sender.', 
        usage: "optional", 
        fixed_length: 8,
        minimum_length: 8, 
        maximum_length: 8, 
        possible_values: ".{8}"
    },
    {
        code: "153",
        name: "item status code", 
        description: 'Code that indicates the product status for the customer.', 
        usage: "optional", 
        fixed_length: 2,
        minimum_length: 2, 
        maximum_length: 2, 
        possible_values: ".{2}"
    },
    {
        code: "154",
        name: "last nota fiscal series", 
        description: 'Series of the nota fiscal related to the last shipment/delivery of the item made from the supplier to the customer.', 
        usage: "optional", 
        fixed_length: 4,
        minimum_length: 4, 
        maximum_length: 4, 
        possible_values: ".{4}"
    },
    {
        code: "201",
        name: "operational category", 
        description: 'Indicates the type of transaction that was made in the company bank account. Example: "d" for debit and "c" for credit. This data element references a value.', 
        usage: "optional", 
        fixed_length: 1,
        minimum_length: 1, 
        maximum_length: 1, 
        possible_values: ".{1}"
    },
    {
        code: "243",
        name: "sender name", 
        description: 'Name by which the sender is identified by its partner', 
        usage: "optional", 
        fixed_length: 25,
        minimum_length: 25, 
        maximum_length: 25, 
        possible_values: ".{25}"
    },
    {
        code: "244",
        name: "receiver name", 
        description: 'Name by which the receiver is identified by the sender.', 
        usage: "optional", 
        fixed_length: 25,
        minimum_length: 25, 
        maximum_length: 25, 
        possible_values: ".{25}"
    },
    {
        code: "245",
        name: "total number of values", 
        description: 'Sum of the values in the segments that were transmitted for control purposes.', 
        usage: "optional", 
        fixed_length: 17,
        minimum_length: 17, 
        maximum_length: 17, 
        possible_values: "[0-9 ]{17}"
    },
    {
        code: "368",
        name: "delivery/shipment initial date",
        description: 'Initial date for the delivery shipment of the item, based in the calculation of the window period (e.g. 10 business days from the end of the delivery).',
        usage: "optional",
        fixed_length: 6,
        minimum_length: 6,
        maximum_length: 6,
        possible_values: "(\\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\\d|30|31)"
    },
    {
        code: "391",
        name: "shipment or delivery identif.",
        description: 'Identifies if the item is for a delivery or shipment. - "1": delivery - "2": shipment The interpretation of the next segment is directly related to this data element.',
        usage: "mandatory",
        fixed_length: 1,
        minimum_length: 1,
        maximum_length: 1,
        possible_values: ".{1}"
    },
    {
        code: "409",
        name: "resale order number", 
        description: 'Number of the purchase order that will be used for reselling.', 
        usage: "optional", 
        fixed_length: 13,
        minimum_length: 13, 
        maximum_length: 13, 
        possible_values: ".{13}"
    },
    {
        code: "433",
        name: "schedule qualifier", 
        description: 'Determines if the schedule is being used for the purpose of delivery, planning or complement the delivery/shipment schedule. - "E": delivery (firm) - "P": planning (forecast) - "C": complement', 
        usage: "optional", 
        fixed_length: 1,
        minimum_length: 1, 
        maximum_length: 1, 
        possible_values: ".{1}"
    },
    {
        code: "434",
        name: "schedule type identification", 
        description: '- "1": firm schedule (frozen period) - "2": item in processing (not used) - "3": item acquisition - "4": planned time - "6": canceled purchase order - "7": open purchase order without schedule - "8": unallocated requested quantity', 
        usage: "optional", 
        fixed_length: 1,
        minimum_length: 1, 
        maximum_length: 1, 
        possible_values: ".{1}"
    },
    {
        code: "447",
        name: "conversion factor", 
        description: 'Converts the stocked unit of measurement to the supplied or produced unit of measurement, as quoted by the supplier.', 
        usage: "optional", 
        fixed_length: 10,
        minimum_length: 10, 
        maximum_length: 10, 
        possible_values: "[0-9 ]{10}"
    },
    {
        code: "448",
        name: "item technical change", 
        description: 'Identification of the technical modification in the item design, as specified in the item design. Format: "G 00", "  00".', 
        usage: "optional", 
        fixed_length: 4,
        minimum_length: 4, 
        maximum_length: 4, 
        possible_values: ".{4}"
    },
    {
        code: "449",
        name: "part number code", 
        description: 'Identification of the product internally in the "CBL", showing the type of material or supplying factory and material specification.', 
        usage: "optional", 
        fixed_length: 10,
        minimum_length: 10, 
        maximum_length: 10, 
        possible_values: ".{10}"
    },
    {
        code: "459",
        name: "resale order type", 
        description: "", 
        usage: "optional", 
        fixed_length: 2,
        minimum_length: 2, 
        maximum_length: 2, 
        possible_values: ".{2}"
    },
    {
        code: "531",
        name: "item weight", 
        description: 'Weight of the supplied item.', 
        usage: "optional", 
        fixed_length: 12,
        minimum_length: 12, 
        maximum_length: 12, 
        possible_values: ".{12}"
    },
    {
        code: "532",
        name: "weight unit of measurement", 
        description: 'Weight unit of measurement (e.g. "KG" for kilogram)', 
        usage: "optional", 
        fixed_length: 2,
        minimum_length: 2, 
        maximum_length: 2, 
        possible_values: "[0-9 ]{2}"
    },
    {
        code: "533",
        name: "customer primary package ident.",
        description: 'Primary (internal) package code assigned by Ford (CMMS3).',
        usage: "mandatory",
        fixed_length: 30,
        minimum_length: 30,
        maximum_length: 30,
        possible_values: ".{30}"
    },
    {
        code: "534",
        name: "package description", 
        description: 'Package description.', 
        usage: "optional", 
        fixed_length: 20,
        minimum_length: 20, 
        maximum_length: 20, 
        possible_values: ".{20}"
    },
    {
        code: "535",
        name: "package height", 
        description: 'Example: height of the VDA box.', 
        usage: "optional", 
        fixed_length: 12,
        minimum_length: 12, 
        maximum_length: 12, 
        possible_values: "[0-9 ]{12}"
    },
    {
        code: "536",
        name: "package width", 
        description: 'Example: width of the VDA box.', 
        usage: "optional", 
        fixed_length: 12,
        minimum_length: 12, 
        maximum_length: 12, 
        possible_values: "[0-9 ]{12}"
    },
    {
        code: "537",
        name: "package length", 
        description: 'Example: length of the VDA box.', 
        usage: "optional", 
        fixed_length: 12,
        minimum_length: 12, 
        maximum_length: 12, 
        possible_values: "[0-9 ]{12}"
    },
    {
        code: "538",
        name: "dimensions unit of measurement", 
        description: 'Unit of measurement for the dimensions (eg: "MM" for millimeter, "CM" for centimeter, "MR" for meter).', 
        usage: "optional", 
        fixed_length: 2,
        minimum_length: 2, 
        maximum_length: 2, 
        possible_values: ".{2}"
    },
    {
        code: "539",
        name: "package weight", 
        description: 'Example: weight of the VDA box.', 
        usage: "optional", 
        fixed_length: 12,
        minimum_length: 12, 
        maximum_length: 12, 
        possible_values: "[0-9 ]{12}"
    },
    {
        code: "541",
        name: "customer primary package capac.",
        description: 'Capacity of the package in pieces.',
        usage: "optional",
        fixed_length: 12,
        minimum_length: 12,
        maximum_length: 12,
        possible_values: "[0-9 ]{12}"
    },
    {
        code: "542",
        name: "# of primary packages per layer",
        description: 'Number of primary packages per layer of the secondary package.] Example: number of boxes per pallet layer.',
        usage: "optional",
        fixed_length: 3,
        minimum_length: 3,
        maximum_length: 3,
        possible_values: "[0-9 ]{3}"
    },
    {
        code: "543",
        name: "# of secondary package layers",
        description: 'Number of layers of a pallet.',
        usage: "optional",
        fixed_length: 3,
        minimum_length: 3,
        maximum_length: 3,
        possible_values: "[0-9 ]{3}"
    },
    {
        code: "640",
        name: "reference purchase order 1", 
        description: 'Reference purchase order number 1 (Honda slip number).', 
        usage: "mandatory", 
        fixed_length: 14,
        minimum_length: 14, 
        maximum_length: 14, 
        possible_values: ".{14}"
    },
    {
        code: "641",
        name: "reference purchase order 2", 
        description: 'Reference purchase order number 2 (Seppen).', 
        usage: "mandatory", 
        fixed_length: 10,
        minimum_length: 10, 
        maximum_length: 10, 
        possible_values: ".{10}"
    },
    {
        code: "642",
        name: "production batch number", 
        description: 'Production batch number.', 
        usage: "mandatory", 
        fixed_length: 12,
        minimum_length: 12, 
        maximum_length: 12, 
        possible_values: ".{12}"
    },
    {
        code: "643",
        name: "initial production control", 
        description: 'Initial production control (CPI).', 
        usage: "mandatory", 
        fixed_length: 3,
        minimum_length: 3, 
        maximum_length: 3, 
        possible_values: ".{3}"
    },
    {
        code: "644",
        name: 'item delivery / "bem" date',
        description: '(no description)',
        usage: "mandatory",
        fixed_length: 6,
        minimum_length: 6,
        maximum_length: 6,
        possible_values: "(\\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\\d|30|31)"
    },
    {
        code: "645",
        name: "delivery time", 
        description: 'Delivery time (HHMM format).', 
        usage: "mandatory", 
        fixed_length: 4,
        minimum_length: 4, 
        maximum_length: 4, 
        possible_values: "([0-1]\\d|2[0-3])([0-5]\\d)"
    },
    {
        code: "646",
        name: "delivery quantity", 
        description: 'Delivery quantity', 
        usage: "mandatory", 
        fixed_length: 9,
        minimum_length: 9, 
        maximum_length: 9, 
        possible_values: "[0-9 ]{9}"
    },
    {
        code: "648",
        name: "purchase order type", 
        description: 'Acronym of the purchase order type.', 
        usage: "mandatory", 
        fixed_length: 2,
        minimum_length: 2, 
        maximum_length: 2, 
        possible_values: ".{2}"
    },
    {
        code: "663",
        name: "last nota fiscal number", 
        description: 'Number of the nota fiscal related to the last shipment/delivery of the item made from the supplier to the customer.', 
        usage: "optional", 
        fixed_length: 9,
        minimum_length: 9, 
        maximum_length: 9, 
        possible_values: "[0-9 ]{9}"
    },
    {
        code: "9999",
        name: "blank", 
        description: 'Blank space', 
        usage: "mandatory", 
        minimum_length: 1, 
        maximum_length: 128, 
        possible_values: "[ ]{REMAINDER}"
    }
]

module.exports = dataElementSeeds;
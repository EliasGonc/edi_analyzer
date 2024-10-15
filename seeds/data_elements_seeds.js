const dataElementSeeds = [
    { code: '2',
        name: 'DESTINATION FACTORY CODE', 
        description: 'Code of the factory where the goods will be delivered. For purchase orders with prefixes ending in: - "P": use code "028" - "T": use code "081" - "C": use code "010"', 
        usage: 'mandatory', 
        minimum_length: 3, 
        maximum_length: 3, 
        possible_values: [ ".{3}" ]
    },
    { code: '3',
        name: 'CURRENT SCHEDULE IDENTIFICATION', 
        description: 'Identification of the current part number/material schedule issued by the customer, that will keep unaltered until a new schedule is issued.', 
        usage: 'mandatory', 
        minimum_length: 9, 
        maximum_length: 9, 
        possible_values: [ ".{9}" ]
    },
    { code: '4',
        name: 'CURRENT SCHEDULE DATE', 
        description: 'Issue date of the current part number/material scheduled issued by the customer.', 
        usage: 'mandatory', 
        minimum_length: 6, 
        maximum_length: 6, 
        possible_values: [ "([0-9 ]{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|30|31)" ]
    },
    { code: '5',
        name: 'PREVIOUS SCHEDULE IDENTIF.',
        description: 'Identification of the previous part number/material schedule issued by the customer.',
        usage: 'optional',
        minimum_length: 9,
        maximum_length: 9,
        possible_values: [ ".{9}" ]
    },
    { code: '6',
        name: 'PREVIOUS SCHEDULE DATE', 
        description: 'Issue date of the previous part number/material schedule issued by the customer.', 
        usage: 'optional', 
        minimum_length: 6, 
        maximum_length: 6, 
        possible_values: [ "([0-9 ]{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|30|31)" ]
    },
    { code: '7',
        name: 'CUSTOMER PART NUMBER CODE', 
        description: 'Internal code assigned by the customer for the items that they acquire from the supplier.', 
        usage: 'mandatory', 
        minimum_length: 30, 
        maximum_length: 30, 
        possible_values: [ ".{30}" ]
    },
    { code: '8',
        name: 'SUPPLIER PART NUMBER CODE', 
        description: 'Internal code assigned by the supplier for the items that they supply to the customer.', 
        usage: 'optional', 
        minimum_length: 30, 
        maximum_length: 30, 
        possible_values: [ ".{30}" ]
    },
    { code: '9',
        name: 'PURCHASE ORDER NUMBER', 
        description: 'Number of the purchase order/supply contract of items, issued by the customer. The number of the purchase order has 9 characters, 4 alphanumerical and 5 numeric. The last three indicate the purchase order type.', 
        usage: 'mandatory', 
        minimum_length: 12, 
        maximum_length: 12, 
        possible_values: [ ".{12}" ]
    },
    { code: '10',
        name: 'TARGET LOCATION CODE', 
        description: 'Customer destination location code, where the items will be delivered. This code must be aligned between customer and supplier.', 
        usage: 'optional', 
        minimum_length: 5, 
        maximum_length: 5, 
        possible_values: [ ".{5}" ]
    },
    { code: '11',
        name: 'CONTACT IDENTIFICATION', 
        description: 'Identification of the responsible person for contact.', 
        usage: 'optional', 
        minimum_length: 11, 
        maximum_length: 11, 
        possible_values: [ ".{11}" ]
    },
    { code: '12',
        name: 'LAST DELIVERY/SHIPMENT DATE',
        description: 'Date of the last delivery/shipment of the item made from the supplier to the customer.',
        usage: 'optional',
        minimum_length: 6,
        maximum_length: 6,
        possible_values: [ "([0-9 ]{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|30|31)" ]
    },
    { code: '14',
        name: 'LAST NOTA FISCAL DATE', 
        description: 'Issue date of the nota fiscal related to the last shipment/ /delivery of the item made from the supplier to the customer.', 
        usage: 'optional', 
        minimum_length: 6, 
        maximum_length: 6, 
        possible_values: [ "([0-9 ]{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|30|31)" ]
    },
    { code: '15',
        name: 'LAST SHIPMENT/DELIVERY QUANTITY',
        description: 'Quantity of the last delivery/shipment of the item made from the supplier to the customer.',
        usage: 'optional',
        minimum_length: 12,
        maximum_length: 12,
        possible_values: [ "[0-9 ]{12}" ]
    },
    { code: '16',
        name: 'CUMULATIVE DELIV./SHIP. QTY.',
        description: 'Cumulative quantity of the item delivered/shipped from a deter- mined date until the date of the last delivery/shipment.',
        usage: 'optional',
        minimum_length: 14,
        maximum_length: 14,
        possible_values: [ "([0-9 ]{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|30|31)" ]
    },
    { code: '17',
        name: 'CUMULATIVE REQUIRED QTY', 
        description: 'Cumulative quantity required by the customer from a determined date until the message date.', 
        usage: 'optional', 
        minimum_length: 14, 
        maximum_length: 14, 
        possible_values: [ "([0-9 ]{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|30|31)" ]
    },
    { code: '18',
        name: 'MINIMUM BATCH QUANTITY', 
        description: 'Minimum batch quantity of the item to be delivered/shipped at once from the supplier to the customer.', 
        usage: 'optional', 
        minimum_length: 12, 
        maximum_length: 12, 
        possible_values: [ "[0-9 ]{12}" ]
    },
    { code: '19',
        name: 'UNIT OF MEASUREMENT CODE', 
        description: 'Agreed item unit of measurement code. Exs: KG, LT, PC, MT, etc.', 
        usage: 'mandatory', 
        minimum_length: 2, 
        maximum_length: 2, 
        possible_values: [ ".{2}" ]
    },
    { code: '20',
        name: 'SUPPLY FREQUENCY CODE', 
        description: 'Code that indicates the supply frequency of the item. This code must be aligned between the customer and the supplier.', 
        usage: 'optional', 
        minimum_length: 3, 
        maximum_length: 3, 
        possible_values: [ ".{3}" ]
    },
    { code: '21',
        name: 'UNLOADING POINT CODE', 
        description: 'Code of the unloading point in the customer.', 
        usage: 'optional', 
        minimum_length: 7, 
        maximum_length: 7, 
        possible_values: [ ".{7}" ]
    },
    { code: '22',
        name: 'NUMBER OF DECIMAL PLACES', 
        description: 'Number of decimal places used in certain segments.', 
        usage: 'mandatory', 
        minimum_length: 1, 
        maximum_length: 1, 
        possible_values: [ "[0-9 ]{1}" ]
    },
    { code: '23',
        name: 'DELIVERY/SHIPMENT WINDOW',
        description: 'Identifies the period defined by the customer for receiving the itens. The first two positions indicate the initial hour and the last two positions the final hour.',
        usage: 'optional',
        minimum_length: 4,
        maximum_length: 4,
        possible_values: [ "([0-1]\d|2[0-3])([0-1]\d|2[0-3])" ]
    },
    { code: '24',
        name: 'ITEM DELIVERY/SHIPMENT DATE',
        description: 'Date for the delivery/shipment of the item. When this field does not contain a date, its contents must be aligned between the  parties.',
        usage: 'mandatory',
        minimum_length: 6,
        maximum_length: 6,
        possible_values: [ "([0-9 ]{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|30|31)" ]
    },
    { code: '24',
        name: 'ITEM DELIVERY/SHIPMENT DATE',
        description: 'Date for the delivery/shipment of the item. When this field does not contain a date, its contents must be aligned between the  parties.',
        usage: 'optional',
        minimum_length: 6,
        maximum_length: 6,
        possible_values: [ "([0-9 ]{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|30|31)" ]
    },
    { code: '25',
        name: 'ITEM DELIVERY/SHIPMENT QUANTITY',
        description: 'Item quantity for delivery/shipment. This field is associated with the data elements PE1-13-0022 (number of decimal places) and the previous PE3 data element 24 (delivery date).',
        usage: 'mandatory',
        minimum_length: 9,
        maximum_length: 9,
        possible_values: [ "([0-9 ]{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|30|31)" ]
    },
    { code: '26',
        name: 'CUSTOMER SECONDARY PACKAGE ID', 
        description: 'Identification assigned by the customer for the packages to be used in the item supply. Example: pallet, container, etc.', 
        usage: 'optional', 
        minimum_length: 30, 
        maximum_length: 30, 
        possible_values: [ ".{30}" ]
    },
    { code: '27',
        name: 'SUPPLIER SECONDARY PACKAGE ID', 
        description: 'Identification assigned by the supplier for the packages to be used in the item supply. Example: pallet, container, etc.', 
        usage: 'optional', 
        minimum_length: 30, 
        maximum_length: 30, 
        possible_values: [ ".{30}" ]
    },
    { code: '28',
        name: 'CUSTOMER SECONDARY PAC. CAPAC.',
        description: 'The number of primary packages to be conditioned in a primary package. Example: the number of boxes in a pallet.',
        usage: 'optional',
        minimum_length: 12,
        maximum_length: 12,
        possible_values: [ "[0-9 ]{12}" ]
    },
    { code: '28',
        name: 'SECONDARY PACKAGE CAPACITY', 
        description: 'The number of primary packages to be conditioned in a secondary package. Example: the number of boxes in a pallet.', 
        usage: 'optional', 
        minimum_length: 12, 
        maximum_length: 12, 
        possible_values: [ "[0-9 ]{12}" ]
    },
    { code: '29',
        name: 'FREE INFORMATIVE TEXT', 
        description: 'Message in free text format', 
        usage: 'mandatory', 
        minimum_length: 40, 
        maximum_length: 40, 
        possible_values: [ ".{40}" ]
    },
    { code: '29',
        name: 'FREE INFORMATIVE TEXT', 
        description: 'Message in free text format', 
        usage: 'optional', 
        minimum_length: 40, 
        maximum_length: 40, 
        possible_values: [ ".{40}" ]
    },
    { code: '30',
        name: 'PRODUCTION CLEARANCE DATE', 
        description: 'Date (MMYY) until the quantities informed in the message are cleared for production with the commitment of the customer with the supplier', 
        usage: 'optional', 
        minimum_length: 4, 
        maximum_length: 4, 
        possible_values: [ "([0-9 ]{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|30|31)" ]
    },
    { code: '31',
        name: 'RAW MATERIAL CLEARANCE DATE', 
        description: 'End date (MMYY) that can be used by the supplier as reference for the acquisition of raw material, subject to modifications by the customer.', 
        usage: 'optional', 
        minimum_length: 4, 
        maximum_length: 4, 
        possible_values: [ "([0-9 ]{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|30|31)" ]
    },
    { code: '33',
        name: 'MESSAGE TYPE IDENTIFICATION', 
        description: 'Number that identifies the message type, that must be defined by the responsible committee', 
        usage: 'mandatory', 
        minimum_length: 3, 
        maximum_length: 3, 
        possible_values: [ "[0-9 ]{3}" ]
    },
    { code: '34',
        name: 'MESSAGE VERSION NUMBER', 
        description: 'Number of the version of the message type that must obey the item 2.3 (change log) of the message type.', 
        usage: 'mandatory', 
        minimum_length: 2, 
        maximum_length: 2, 
        possible_values: [ "[0-9 ]{2}" ]
    },
    { code: '35',
        name: 'MESSAGE CREATION DATE/TIME',
        description: 'Message creation date time (YYMMDDHHmmSS format)',
        usage: 'mandatory',
        minimum_length: 12,
        maximum_length: 12,
        possible_values: [ "([0-9 ]{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|30|31)([0-1]\d|2[0-3])([0-5]\d)([0-5]\d)" ]
    },
    { code: '36',
        name: 'TRANSMISSION CONTROL NUMBER', 
        description: 'Controle number inside the communication transaction, assigned by the sender. Sequential number, for each transmission and for each reception.', 
        usage: 'optional', 
        minimum_length: 5, 
        maximum_length: 5, 
        possible_values: [ "[0-9 ]{5}" ]
    },
    { code: '37',
        name: 'SENDER IDENTIFICATION', 
        description: 'Identifies the sender in the communication, usually represented by its CNPJ number (Brazilian VAT number)', 
        usage: 'mandatory', 
        minimum_length: 14, 
        maximum_length: 14, 
        possible_values: [ "[0-9 ]{14}" ]
    },
    { code: '38',
        name: 'RECEIVER IDENTIFICATION', 
        description: 'Identifies the receiver in the communication, usually represented by its their CNPJ number (Brazilian VAT number)', 
        usage: 'optional', 
        minimum_length: 14, 
        maximum_length: 14, 
        possible_values: [ ".{14}" ]
    },
    { code: '39',
        name: 'NUMBER OF SEGMENTS', 
        description: 'Number of segments in the message, including the ITP and FTP segments.', 
        usage: 'mandatory', 
        minimum_length: 9, 
        maximum_length: 9, 
        possible_values: [ "[0-9 ]{9}" ]
    },
    { code: '40',
        name: 'ITEM DELIVERY/SHIPMENT TIME',
        description: 'Time (HH) for the delivery/shipment of the item, defined by the customer.',
        usage: 'optional',
        minimum_length: 2,
        maximum_length: 2,
        possible_values: [ "([0-1]\d|2[0-3])" ]
    },
    { code: '41',
        name: 'SUPPLIER PRIMARY PACKAGE ID', 
        description: 'Identification assigned by the supplier for the packages to be directly in the item. Example: box, barrel, roll, load, etc.', 
        usage: 'optional', 
        minimum_length: 30, 
        maximum_length: 30, 
        possible_values: [ ".{30}" ]
    },
    { code: '69',
        name: 'RESPONSIBLE PARTY FOR PACKAGE', 
        description: 'Code that identifies the responsible party for supplying the package ("F" for supplier, "C" for customer)', 
        usage: 'optional', 
        minimum_length: 1, 
        maximum_length: 1, 
        possible_values: [ ".{1}" ]
    },
    { code: '72',
        name: 'SUPPLIER PRIMARY PACK. CAPACITY',
        description: 'The number of item that can be conditioned in a primary package.',
        usage: 'optional',
        minimum_length: 12,
        maximum_length: 12,
        possible_values: [ "[0-9 ]{12}" ]
    },
    { code: '74',
        name: 'TYPE OF SUPPLY CODE', 
        description: 'Code issued by the customer that identifies the use of the item. - "P": production - "R": replacement parts (OEM) - "T": triangulation - "E": exportation - "X": others - "A": sample - "F": tools and solutions', 
        usage: 'mandatory', 
        minimum_length: 1, 
        maximum_length: 1, 
        possible_values: [ ".{1}" ]
    },
    { code: '113',
        name: 'TRANSPORT ROUTE CODE', 
        description: 'Code that identifies the transport route.', 
        usage: 'optional', 
        minimum_length: 3, 
        maximum_length: 3, 
        possible_values: [ ".{3}" ]
    },
    { code: '151',
        name: 'SENDER INTERNAL CODE', 
        description: 'Internal code by which the sender is recognized by the receiver.', 
        usage: 'optional', 
        minimum_length: 8, 
        maximum_length: 8, 
        possible_values: [ ".{8}" ]
    },
    { code: '152',
        name: 'RECEIVER INTERNAL CODE', 
        description: 'Internal code by which the receiver is recognized by the sender.', 
        usage: 'optional', 
        minimum_length: 8, 
        maximum_length: 8, 
        possible_values: [ ".{8}" ]
    },
    { code: '153',
        name: 'ITEM STATUS CODE', 
        description: 'Code that indicates the product status for the customer.', 
        usage: 'optional', 
        minimum_length: 2, 
        maximum_length: 2, 
        possible_values: [ ".{2}" ]
    },
    { code: '154',
        name: 'LAST NOTA FISCAL SERIES', 
        description: 'Series of the nota fiscal related to the last shipment/delivery of the item made from the supplier to the customer.', 
        usage: 'optional', 
        minimum_length: 4, 
        maximum_length: 4, 
        possible_values: [ ".{4}" ]
    },
    { code: '201',
        name: 'OPERATIONAL CATEGORY', 
        description: 'Indicates the type of transaction that was made in the company bank account. Example: "d" for debit and "c" for credit. This data element references a value.', 
        usage: 'optional', 
        minimum_length: 1, 
        maximum_length: 1, 
        possible_values: [ ".{1}" ]
    },
    { code: '243',
        name: 'SENDER NAME', 
        description: 'Name by which the sender is identified by its partner', 
        usage: 'optional', 
        minimum_length: 25, 
        maximum_length: 25, 
        possible_values: [ ".{25}" ]
    },
    { code: '244',
        name: 'RECEIVER NAME', 
        description: 'Name by which the receiver is identified by the sender.', 
        usage: 'optional', 
        minimum_length: 25, 
        maximum_length: 25, 
        possible_values: [ ".{25}" ]
    },
    { code: '245',
        name: 'TOTAL NUMBER OF VALUES', 
        description: 'Sum of the values in the segments that were transmitted for control purposes.', 
        usage: 'optional', 
        minimum_length: 17, 
        maximum_length: 17, 
        possible_values: [ "[0-9 ]{17}" ]
    },
    { code: '368',
        name: 'DELIVERY/SHIPMENT INITIAL DATE',
        description: 'Initial date for the delivery shipment of the item, based in the calculation of the window period (e.g. 10 business days from the end of the delivery).',
        usage: 'optional',
        minimum_length: 6,
        maximum_length: 6,
        possible_values: [ "([0-9 ]{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|30|31)" ]
    },
    { code: '391',
        name: 'SHIPMENT OR DELIVERY IDENTIF.',
        description: 'Identifies if the item is for a delivery or shipment. - "1": delivery - "2": shipment The interpretation of the next segment is directly related to this data element.',
        usage: 'mandatory',
        minimum_length: 1,
        maximum_length: 1,
        possible_values: [ ".{1}" ]
    },
    { code: '409',
        name: 'RESALE ORDER NUMBER', 
        description: 'Number of the purchase order that will be used for reselling.', 
        usage: 'optional', 
        minimum_length: 13, 
        maximum_length: 13, 
        possible_values: [ ".{13}" ]
    },
    { code: '433',
        name: 'SCHEDULE QUALIFIER', 
        description: 'Determines if the schedule is being used for the purpose of delivery, planning or complement the delivery/shipment schedule. - "E": delivery (firm) - "P": planning (forecast) - "C": complement', 
        usage: 'optional', 
        minimum_length: 1, 
        maximum_length: 1, 
        possible_values: [ ".{1}" ]
    },
    { code: '434',
        name: 'SCHEDULE TYPE IDENTIFICATION', 
        description: '- "1": firm schedule (frozen period) - "2": item in processing (not used) - "3": item acquisition - "4": planned time - "6": canceled purchase order - "7": open purchase order without schedule - "8": unallocated requested quantity', 
        usage: 'optional', 
        minimum_length: 1, 
        maximum_length: 1, 
        possible_values: [ ".{1}" ]
    },
    { code: '447',
        name: 'CONVERSION FACTOR', 
        description: 'Converts the stocked unit of measurement to the supplied or produced unit of measurement, as quoted by the supplier.', 
        usage: 'optional', 
        minimum_length: 10, 
        maximum_length: 10, 
        possible_values: [ "[0-9 ]{10}" ]
    },
    { code: '448',
        name: 'ITEM TECHNICAL CHANGE', 
        description: 'Identification of the technical modification in the item design, as specified in the item design. Format: "G 00", "  00".', 
        usage: 'optional', 
        minimum_length: 4, 
        maximum_length: 4, 
        possible_values: [ ".{4}" ]
    },
    { code: '449',
        name: 'PART NUMBER CODE', 
        description: 'Identification of the product internally in the "CBL", showing the type of material or supplying factory and material specification.', 
        usage: 'optional', 
        minimum_length: 10, 
        maximum_length: 10, 
        possible_values: [ ".{10}" ]
    },
    { code: '531',
        name: 'ITEM WEIGHT', 
        description: 'Weight of the supplied item.', 
        usage: 'optional', 
        minimum_length: 12, 
        maximum_length: 12, 
        possible_values: [ ".{12}" ]
    },
    { code: '532',
        name: 'WEIGHT UNIT OF MEASUREMENT', 
        description: 'Weight unit of measurement (e.g. "KG" for kilogram)', 
        usage: 'optional', 
        minimum_length: 2, 
        maximum_length: 2, 
        possible_values: [ "[0-9 ]{2}" ]
    },
    { code: '533',
        name: 'CUSTOMER PRIMARY PACKAGE IDENT.',
        description: 'Primary (internal) package code assigned by Ford (CMMS3).',
        usage: 'mandatory',
        minimum_length: 30,
        maximum_length: 30,
        possible_values: [ ".{30}" ]
    },
    { code: '534',
        name: 'PACKAGE DESCRIPTION', 
        description: 'Package description.', 
        usage: 'optional', 
        minimum_length: 20, 
        maximum_length: 20, 
        possible_values: [ ".{20}" ]
    },
    { code: '535',
        name: 'PACKAGE HEIGHT', 
        description: 'Example: height of the VDA box.', 
        usage: 'optional', 
        minimum_length: 12, 
        maximum_length: 12, 
        possible_values: [ "[0-9 ]{12}" ]
    },
    { code: '536',
        name: 'PACKAGE WIDTH', 
        description: 'Example: width of the VDA box.', 
        usage: 'optional', 
        minimum_length: 12, 
        maximum_length: 12, 
        possible_values: [ "[0-9 ]{12}" ]
    },
    { code: '537',
        name: 'PACKAGE LENGTH', 
        description: 'Example: length of the VDA box.', 
        usage: 'optional', 
        minimum_length: 12, 
        maximum_length: 12, 
        possible_values: [ "[0-9 ]{12}" ]
    },
    { code: '538',
        name: 'DIMENSIONS UNIT OF MEASUREMENT', 
        description: 'Unit of measurement for the dimensions (eg: "MM" for millimeter, "CM" for centimeter, "MR" for meter).', 
        usage: 'optional', 
        minimum_length: 2, 
        maximum_length: 2, 
        possible_values: [ ".{2}" ]
    },
    { code: '539',
        name: 'PACKAGE WEIGHT', 
        description: 'Example: weight of the VDA box.', 
        usage: 'optional', 
        minimum_length: 12, 
        maximum_length: 12, 
        possible_values: [ "[0-9 ]{12}" ]
    },
    { code: '541',
        name: 'CUSTOMER PRIMARY PACKAGE CAPAC.',
        description: 'Capacity of the package in pieces.',
        usage: 'optional',
        minimum_length: 12,
        maximum_length: 12,
        possible_values: [ "[0-9 ]{12}" ]
    },
    { code: '542',
        name: '# OF PRIMARY PACKAGES PER LAYER',
        description: 'Number of primary packages per layer of the secondary package.] Example: number of boxes per pallet layer.',
        usage: 'optional',
        minimum_length: 3,
        maximum_length: 3,
        possible_values: [ "[0-9 ]{3}" ]
    },
    { code: '543',
        name: '# OF SECONDARY PACKAGE LAYERS',
        description: 'Number of layers of a pallet.',
        usage: 'optional',
        minimum_length: 3,
        maximum_length: 3,
        possible_values: [ "[0-9 ]{3}" ]
    },
    { code: '640',
        name: 'REFERENCE PURCHASE ORDER 1', 
        description: 'Reference purchase order number 1 (Honda slip number).', 
        usage: 'mandatory', 
        minimum_length: 14, 
        maximum_length: 14, 
        possible_values: [ ".{14}" ]
    },
    { code: '641',
        name: 'REFERENCE PURCHASE ORDER 2', 
        description: 'Reference purchase order number 2 (Seppen).', 
        usage: 'mandatory', 
        minimum_length: 10, 
        maximum_length: 10, 
        possible_values: [ ".{10}" ]
    },
    { code: '642',
        name: 'PRODUCTION BATCH NUMBER', 
        description: 'Production batch number.', 
        usage: 'mandatory', 
        minimum_length: 12, 
        maximum_length: 12, 
        possible_values: [ ".{12}" ]
    },
    { code: '643',
        name: 'INITIAL PRODUCTION CONTROL', 
        description: 'Initial production control (CPI).', 
        usage: 'mandatory', 
        minimum_length: 3, 
        maximum_length: 3, 
        possible_values: [ ".{3}" ]
    },
    { code: '644',
        name: 'ITEM DELIVERY / "BEM" DATE',
        description: '(no description)',
        usage: 'mandatory',
        minimum_length: 6,
        maximum_length: 6,
        possible_values: [ "([0-9 ]{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|30|31)" ]
    },
    { code: '645',
        name: 'DELIVERY TIME', 
        description: 'Delivery time (HHMM format).', 
        usage: 'mandatory', 
        minimum_length: 4, 
        maximum_length: 4, 
        possible_values: [ "([0-1]\d|2[0-3])([0-5]\d)" ]
    },
    { code: '646',
        name: 'DELIVERY QUANTITY', 
        description: 'Delivery quantity', 
        usage: 'mandatory', 
        minimum_length: 9, 
        maximum_length: 9, 
        possible_values: [ "[0-9 ]{9}" ]
    },
    { code: '648',
        name: 'PURCHASE ORDER TYPE', 
        description: 'Acronym of the purchase order type.', 
        usage: 'mandatory', 
        minimum_length: 2, 
        maximum_length: 2, 
        possible_values: [ ".{2}" ]
    },
    { code: '663',
        name: 'LAST NOTA FISCAL NUMBER', 
        description: 'Number of the nota fiscal related to the last shipment/delivery of the item made from the supplier to the customer.', 
        usage: 'optional', 
        minimum_length: 9, 
        maximum_length: 9, 
        possible_values: [ "[0-9 ]{9}" ]
    },
    { code: '9999',
        name: 'BLANK', 
        description: 'Blank space', 
        usage: 'mandatory', 
        minimum_length: 1, 
        maximum_length: 128, 
        possible_values: [ " +" ]
    }
]

module.exports = { dataElementSeeds };
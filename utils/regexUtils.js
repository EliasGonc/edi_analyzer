const patternDescriptions = [
    {
        pattern: [
            /\[(\d)-([0-8])\]/,
            /\[([1-9])-(\d)\]/
        ],
        description: "digit from $1 to $2"
    },
    {
        pattern: [
            /\[0-9\]/,
            /\\d/
        ],
        description: "digit"
    },
    {
        pattern: [
            /\[([a-z])-([a-y])\]/,
            /\[([b-z])-([a-z])\]/
        ],
        description: "lowercase letter from $1 to $2"
    },
    {
        pattern: [/\[a-z\]/ 
        ],
        description: "lowercase letter"
    },
    {
        pattern: [
            /\[([A-Z])-([A-Z])\]/,
            /\[([B-Z])-([A-Z])\]/
        ],
        description: "uppercase letter from $1 to $2"
    },
    {
        pattern: [/\[A-Z\]/ 
        ],
        description: "uppercase letter"
    },
    {
        pattern: [
            /\[.*?a-zA-Z.*?\]/,
            /\\d/
        ],
        description: "digit"
    },
]

const suffixDescriptions = [
    {

    }
]

exports.describePattern = function(regexPattern) {
    /*
    [0-9]|\d    => number
    [A-Z]       => uppercased letter
    [a-z]       => lowercased letter
    [A-Za-z]|\w => letter
    [ ]         => space
    .           => any character

    {\d+}       => X {characters}
    {\d+,\d+}   => X to Y {characters}
    */

}


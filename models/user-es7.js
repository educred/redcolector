const userES7 = {
    settings: {
        index : {
            number_of_shards: 3, 
            number_of_replicas: 2 
        },
        analysis: {
            analyzer: {
                analizor_user: {
                    tokenizer: "standard",
                    filter: [
                        "apostrophe", 
                        "lowercase",
                        "trim"
                    ]
                }
            }
        }
    },
    mappings: {
        properties: {
            created:          {type: "date"},
            email:            {type: "text", fields: {keyword: {type: "keyword"}}},
            roles:            {
                type: "nested",
                properties: {
                    admin:     {type: "boolean"},
                    public:    {type: "boolean"},
                    rolInCRED: {type: "text", fields: {keyword: {type: "keyword"}}},
                    unit:      {type: "text", fields: {keyword: {type: "keyword"}}}
                }
            },
            googleID: {type: "text", fields: {keyword: {type: "keyword"}}},
            googleProfile: {
                type: "nested",
                properties: {
                    name:        {type: "text"},
                    family_name: {type: "text"}
                }
            },
            ecusoane: {type: "text", fields: {keyword: {type: "keyword"}}}
        }
    },
    aliases: {
        users: {}
    }
};

module.exports = userES7;
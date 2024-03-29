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
            created: {type: "date"},
            email:   {type: "text", fields: {keyword: {type: "keyword"}}},
            roles:   {
                type: "object",
                properties: {
                    admin:     {type: "boolean"},
                    public:    {type: "boolean"},
                    rolInCRED: {type: "text"},
                    unit:      {type: "text", store: true}
                }
            },
            googleID: {type: "text", fields: {keyword: {type: "keyword"}}},
            googleProfile: {
                type: "object",
                properties: {
                    name:        {type: "text", store: true},
                    given_name:  {type: "text", store: true},
                    family_name: {type: "text", store: true}
                }
            },
            ecusoane: {type: "text", store: true}
        }
    },
    aliases: {
        users: {}
    }
};

module.exports = userES7;
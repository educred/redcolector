const resursaRedES7 = {
    settings: {
        index : {
            number_of_shards: 3, 
            number_of_replicas: 2 
        },
        analysis: {
            analyzer: {
                analizor_red: {
                    tokenizer: "standard",
                    filter: [
                        "apostrophe", 
                        "lowercase",
                        "trim",
                        "stemmer_cu_ro"
                    ]
                }
            },
            filter: {
                stemmer_cu_ro: {
                    type: "stemmer",
                    name: "romanian"
                }
            }
        }
    },
    mappings: {
        properties: {
            date:             {type: "date"},
            idContributor:    {type: "keyword"},
            emailContrib:     {type: "keyword"},
            uuid:             {type: "keyword"},
            autori:           {type: "text"},
            langRED:          {type: "keyword"},
            title:            {type: "text"},
            titleI18n:        {type: "text"},
            arieCurriculara:  {type: "text", fields: {keyword: {type: "keyword"}}},
            level:            {type: "text", fields: {keyword: {type: "keyword"}}},
            discipline:       {type: "text", fields: {keyword: {type: "keyword"}}},
            disciplinePropuse:{type: "text", fields: {keyword: {type: "keyword"}}},
            competenteGen:    {type: "text", fields: {keyword: {type: "keyword"}}},
            description:      {type: "text"},
            identifier:       {type: "text", fields: {keyword: {type: "keyword"}}},
            dependinte:       {type: "text"},
            content:          {type: "text"},
            bibliografie:     {type: "text"},
            contorAcces:      {type: "long"},
            generalPublic:    {type: "boolean"},
            contorDescarcare: {type: "long"},
            etichete:         {type: "text", fields: {keyword: {type: "keyword"}}},
            utilMie:          {type: "long"},
            expertCheck:      {type: "boolean"}
        }
    },
    aliases: {
        resedus: {}
    }
};

module.exports = resursaRedES7;
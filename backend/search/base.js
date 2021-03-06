import util from "util"

export const AUTOCOMPLETE = "autocomplete"
export const AUTOCOMPLETE_SEARCH = "autocomplete_search"

const configureSearch = (model) => {
  model.createMapping(
    {
      settings: {
        analysis: {
          analyzer: {
            [AUTOCOMPLETE]: {
              tokenizer: AUTOCOMPLETE,
              filter: ["lowercase"],
            },
            [AUTOCOMPLETE_SEARCH]: {
              tokenizer: "lowercase",
            },
          },
          tokenizer: {
            [AUTOCOMPLETE]: {
              type: "edge_ngram",
              min_gram: 2,
              max_gram: 10,
              token_chars: ["letter"],
            },
          },
        },
      },
    },
    (err, mapping) => {
      if (err) {
        console.log("Error:", err)
      } else {
        console.log(model)
        console.log("Success:", mapping)
      }
    }
  )

  model.search = util.promisify(model.search, { context: model })
  model.esSearch = util.promisify(model.esSearch, { context: model })

  let count = 0
  const stream = model.synchronize()
  stream.on("data", () => {
    count += 1
  })

  stream.on("close", () => {
    console.log(`Indexed ${count} documents.`)
  })

  stream.on("error", (err) => {
    console.log(`Error ${err}`)
  })
}

export default configureSearch

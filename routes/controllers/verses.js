const Verse = require("../../models/Verse")

module.exports = async (req, res, next) => {

    if (!req.query){
        return res.end()
    }

    const { language, version, book, chapter, verse } = req.query

    if (!language || !version || !book || !chapter){
        return res.end()
    }

    try {
        let query
        if (!verse){
            query = {
                language,
                version,
                book,
                chapter
            }
        }
        else {
            query = { _id: `${ language }.${ version }.${ book }.${ chapter }.${ verse }` }
        }

        const verses = await Verse.find(query)

        res
        .status(200)
        .set("Cache-Control", "private, max-age=86400")
        .json(verses)
    }
    catch (err) {
        console.log(err)
        next({
            status: 500,
            error: {
                code: "server-error",
                message: "An internal server error occured, please try again later!"
            }
        })
    }

}
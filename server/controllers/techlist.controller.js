import Tech from '../models/tech';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getTechs(req, res) {
    Tech.find().sort('-dateAdded').exec((err, techs) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ techs });
    });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addTech(req, res) {
    if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
        res.status(403).end();
    }

    const newTech = new Tech(req.body.post);

  // Let's sanitize inputs
    newTech.title = sanitizeHtml(newTech.title);
    newTech.name = sanitizeHtml(newTech.name);
    newTech.content = sanitizeHtml(newTech.content);

    newTech.slug = slug(newTech.title.toLowerCase(), { lowercase: true });
    newTech.cuid = cuid();
    newTech.save((err, saved) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ post: saved });
    });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getTech(req, res) {
    Tech.findOne({ cuid: req.params.cuid }).exec((err, tech) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ tech });
    });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deleteTech(req, res) {
    Tech.findOne({ cuid: req.params.cuid }).exec((err, tech) => {
        if (err) {
            res.status(500).send(err);
        }

        tech.remove(() => {
            res.status(200).end();
        });
    });
}

/**
* Update a tech
* @param req
* @param res
 *  @returns void
*/

export function updateTech(req, res) {
    Tech.findOne({ cuid: req.params.cuid }).exec((err, tech) => {
        if (err) {
            res.status(500).send(err);
        }

        tech.remove(() => {
            res.status(200).end();
        });
    });
}

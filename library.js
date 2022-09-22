const winston = require.main.require('winston');

const meta = require.main.require('./src/meta');
const db = require.main.require('./src/database');
const categories = require.main.require('./src/categories');
const routeHelpers = require.main.require('./src/routes/helpers');

const ModderSupportPlugin = {
    supportCategoryId: 0,
    async init(params) {
        const { router } = params;

        // Admin panel
        routeHelpers.setupAdminPageRoute(router, '/admin/plugins/mff-modder-support', [], renderAdmin);

        try {
            const options = await meta.settings.get('mff-modder-support');
            if (options.hasOwnProperty('supportCategoryId')) {
                ModderSupportPlugin.supportCategoryId = parseInt(options['supportCategoryId'], 10);
            }
        }
        catch (err) {
            winston.warn(`[plugin/mff-modder-support] Unable to retrieve settings, will keep defaults: ${err.message}`);
        }
    },
    async topicPost(data) {
        if (isSupportSection(data.cid)) {
            checkModderHelpRequest(data.tags);
        }
        return data;
    },
    async topicEdit(data) {
        if (isSupportSection(data.topic.cid)) {
            checkModderHelpRequest(data.data.tags);
        }
        return data;
    },
    async addToAdminNav(header) {
        header.plugins.push({
            route: '/plugins/mff-modder-support',
            name: 'MFF Modder Support',
        });
        return header;
    }
};

function checkModderHelpRequest(tags) {
    if(!tags || tags.length < 1) {
        throw new Error('[[modder-support:no-version]]');
    }
}

function isSupportSection(cid) {
    return cid === ModderSupportPlugin.supportCategoryId;
}

async function renderAdmin(req, res) {
	const cids = await db.getSortedSetRange('categories:cid', 0, -1);
	const data = await categories.getCategoriesFields(cids, ['cid', 'name']);
    res.render('admin/plugins/mff-modder-support', {
		categories: data,
	});
}

module.exports = ModderSupportPlugin;

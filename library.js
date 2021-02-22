const groups = require.main.require('./src/groups');

const ModderSupportPlugin = {
    init(params, callback) {
        callback();
    },
    topicPost(data, callback) {
        if (isSupportSection(data.cid)) {
            checkModderHelpRequest(data, data.tags, callback);
        }
        else {
            callback(null, data);
        }
    },
    topicEdit(data, callback) {
        if (isSupportSection(data.topic.cid)) {
            checkModderHelpRequest(data, data.data.tags, callback);
        }
        else {
            callback(null, data);
        }
    }
};

function checkModderHelpRequest(data, tags, callback) {
    if(!tags || tags.length < 1) {
        return callback(new Error('[[modder-support:no-version]]'));
    }
    callback(null, data);
}

function isSupportSection(cid) {
    return cid == 21; // hard coded for now
}

module.exports = ModderSupportPlugin;

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
    },
    postQueue(data, callback) {
        // don't add to queue if version tag is missing, let filter:topic.post handle the error.
        if (isSupportSection(data.data.cid) && (data.data.tags && data.data.tags.length > 0)) {
            if (isConfirmedModder(data.data.uid, (err, member) => {
                if (err) {
                    callback(err);
                }
                else {
                    if (!member) {
                        data.shouldQueue = true;
                    }
                    callback(null, data);
                }
            }));
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

function isConfirmedModder(uid, callback) {
    // hard coded for now
    groups.isMember(uid, "Moddeurs confirmés", callback);
}

module.exports = ModderSupportPlugin;

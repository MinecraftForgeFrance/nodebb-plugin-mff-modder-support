define('admin/plugins/mff-modder-support', ['settings', 'alerts'], function (Settings, alerts) {
    const MFFModderSupport = {};

    MFFModderSupport.init = function () {
        const settingsForm = $('.mff-modder-support-settings');
        const saveButton = document.getElementById('save');
        Settings.load('mff-modder-support', settingsForm);

        saveButton.addEventListener('click', function () {
            Settings.save('mff-modder-support', settingsForm, function () {
                alerts.alert({
                    type: 'success',
                    alert_id: 'mff-modder-support-saved',
                    title: 'Settings Saved',
                    message: 'Please reload your NodeBB to apply these settings',
                    clickfn: function () {
                        socket.emit('admin.reload');
                    }
                });
            });
        });
    };

    return MFFModderSupport;
});

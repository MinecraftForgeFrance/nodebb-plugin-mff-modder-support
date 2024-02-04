define('admin/plugins/mff-modder-support', ['settings', 'alerts'], function(Settings, alerts) {
	const MFFModderSupport = {};
	
	MFFModderSupport.init = function() {
		Settings.load('mff-modder-support', $('.mff-modder-support-settings'));
	
		$('#save').on('click', function() {
            Settings.save('mff-modder-support', $('.mff-modder-support-settings'), function() {
                alerts.alert({
                    type: 'success',
                    alert_id: 'mff-modder-support-saved',
                    title: 'Settings Saved',
                    message: 'Please reload your NodeBB to apply these settings',
                    clickfn: function() {
                        socket.emit('admin.reload');
                    }
                })
            });
        });
	};
	
	return MFFModderSupport;
});

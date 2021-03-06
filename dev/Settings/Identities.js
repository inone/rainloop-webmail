/* RainLoop Webmail (c) RainLoop Team | Licensed under CC BY-NC-SA 3.0 */

/**
 * @constructor
 */
function SettingsIdentities()
{
	var oData = RL.data();
	
	this.displayName = oData.displayName;
	this.signature = oData.signature;
	this.replyTo = oData.replyTo;

	this.displayNameTrigger = ko.observable(Enums.SaveSettingsStep.Idle);
	this.replyTrigger = ko.observable(Enums.SaveSettingsStep.Idle);
	this.signatureTrigger = ko.observable(Enums.SaveSettingsStep.Idle);

	this.identities = oData.identities;

	this.processText = ko.computed(function () {
		return oData.identitiesLoading() ? Utils.i18n('SETTINGS_IDENTITIES/LOADING_PROCESS') : '';
	}, this);

	this.visibility = ko.computed(function () {
		return '' === this.processText() ? 'hidden' : 'visible';
	}, this);

	this.identityForDeletion = ko.observable(null).extend({'falseTimeout': 3000}).extend({'toggleSubscribe': [this,
		function (oPrev) {
			if (oPrev)
			{
				oPrev.deleteAccess(false);
			}
		}, function (oNext) {
			if (oNext)
			{
				oNext.deleteAccess(true);
			}
		}
	]});
}

Utils.addSettingsViewModel(SettingsIdentities, 'SettingsIdentities', 'SETTINGS_LABELS/LABEL_IDENTITIES_NAME', 'identities');

SettingsIdentities.prototype.addNewIdentity = function ()
{
	kn.showScreenPopup(PopupsIdentityViewModel);
};

SettingsIdentities.prototype.editIdentity = function (oIdentity)
{
	kn.showScreenPopup(PopupsIdentityViewModel, [oIdentity]);
};

/**
 * @param {IdentityModel} oIdentityToRemove
 */
SettingsIdentities.prototype.deleteIdentity = function (oIdentityToRemove)
{
	if (oIdentityToRemove && oIdentityToRemove.deleteAccess())
	{
		this.identityForDeletion(null);
		
		var
			fRemoveFolder = function (oIdentity) {
				return oIdentityToRemove === oIdentity;
			}
		;

		if (oIdentityToRemove)
		{
			this.identities.remove(fRemoveFolder);
			
			RL.remote().identityDelete(function () {
				RL.accountsAndIdentities();
			}, oIdentityToRemove.id);
		}
	}
};

SettingsIdentities.prototype.onBuild = function (oDom)
{
	var self = this;

	oDom
		.on('click', '.identity-item .e-action', function () {
			var oIdentityItem = ko.dataFor(this);
			if (oIdentityItem)
			{
				self.editIdentity(oIdentityItem);
			}
		})
	;

	_.delay(function () {

		var
			oData = RL.data(),
			f1 = Utils.settingsSaveHelperSimpleFunction(self.displayNameTrigger, self),
			f2 = Utils.settingsSaveHelperSimpleFunction(self.replyTrigger, self),
			f3 = Utils.settingsSaveHelperSimpleFunction(self.signatureTrigger, self)
		;

		oData.displayName.subscribe(function (sValue) {
			RL.remote().saveSettings(f1, {
				'DisplayName': sValue
			});
		});

		oData.replyTo.subscribe(function (sValue) {
			RL.remote().saveSettings(f2, {
				'ReplyTo': sValue
			});
		});

		oData.signature.subscribe(function (sValue) {
			RL.remote().saveSettings(f3, {
				'Signature': sValue
			});
		});

	}, 50);
};
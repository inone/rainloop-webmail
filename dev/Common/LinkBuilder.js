/* RainLoop Webmail (c) RainLoop Team | Licensed under CC BY-NC-SA 3.0 */

/**
 * @constructor
 */
function LinkBuilder()
{
	this.sBase = '#/';
	this.sCdnStaticDomain = RL.settingsGet('CdnStaticDomain');
	this.sVersion = RL.settingsGet('Version');
	this.sSpecSuffix = RL.settingsGet('AuthAccountHash') || '0';

	this.sServer = (RL.settingsGet('IndexFile') || './') + '?';
	this.sCdnStaticDomain = '' === this.sCdnStaticDomain ? this.sCdnStaticDomain :
		('/' === this.sCdnStaticDomain.substr(-1) ? this.sCdnStaticDomain : this.sCdnStaticDomain + '/');
}

/**
 * @return {string}
 */
LinkBuilder.prototype.root = function ()
{
	return this.sBase;
};

/**
 * @param {string} sDownload
 * @return {string}
 */
LinkBuilder.prototype.attachmentDownload = function (sDownload)
{
	return this.sServer + '/Raw/' + this.sSpecSuffix + '/Download/' + sDownload;
};

/**
 * @param {string} sDownload
 * @return {string}
 */
LinkBuilder.prototype.attachmentPreview = function (sDownload)
{
	return this.sServer + '/Raw/' + this.sSpecSuffix + '/View/' + sDownload;
};

/**
 * @param {string} sDownload
 * @return {string}
 */
LinkBuilder.prototype.attachmentPreviewAsPlain = function (sDownload)
{
	return this.sServer + '/Raw/' + this.sSpecSuffix + '/ViewAsPlain/' + sDownload;
};

/**
 * @return {string}
 */
LinkBuilder.prototype.upload = function ()
{
	return this.sServer + '/Upload/' + this.sSpecSuffix + '/';
};

/**
 * @return {string}
 */
LinkBuilder.prototype.uploadBackground = function ()
{
	return this.sServer + '/UploadBackground/' + this.sSpecSuffix + '/';
};

/**
 * @return {string}
 */
LinkBuilder.prototype.append = function ()
{
	return this.sServer + '/Append/' + this.sSpecSuffix + '/';
};

/**
 * @param {string} sEmail
 * @return {string}
 */
LinkBuilder.prototype.change = function (sEmail)
{
	return this.sServer + '/Change/' + this.sSpecSuffix + '/' + window.encodeURIComponent(sEmail) + '/';
};

/**
 * @param {string=} sAdd
 * @return {string}
 */
LinkBuilder.prototype.ajax = function (sAdd)
{
	return this.sServer + '/Ajax/' + this.sSpecSuffix + '/' + sAdd;
};

/**
 * @param {string} sRequestHash
 * @return {string}
 */
LinkBuilder.prototype.messageViewLink = function (sRequestHash)
{
	return this.sServer + '/Raw/' + this.sSpecSuffix + '/ViewAsPlain/' + sRequestHash;
};

/**
 * @param {string} sRequestHash
 * @return {string}
 */
LinkBuilder.prototype.messageDownloadLink = function (sRequestHash)
{
	return this.sServer + '/Raw/' + this.sSpecSuffix + '/Download/' + sRequestHash;
};

/**
 * @return {string}
 */
LinkBuilder.prototype.inbox = function ()
{
	return this.sBase + 'mailbox/Inbox';
};

/**
 * @param {string=} sScreenName
 * @return {string}
 */
LinkBuilder.prototype.settings = function (sScreenName)
{
	var sResult = this.sBase + 'settings';
	if (!Utils.isUnd(sScreenName) && '' !== sScreenName)
	{
		sResult += '/' + sScreenName;
	}

	return sResult;
};

/**
 * @param {string} sScreenName
 * @return {string}
 */
LinkBuilder.prototype.admin = function (sScreenName)
{
	var sResult = this.sBase;
	switch (sScreenName) {
	case 'AdminDomains':
		sResult += 'domains';
		break;
	case 'AdminSecurity':
		sResult += 'security';
		break;
	case 'AdminLicensing':
		sResult += 'licensing';
		break;
	}

	return sResult;
};

/**
 * @param {string} sFolder
 * @param {number=} iPage = 1
 * @param {string=} sSearch = ''
 * @return {string}
 */
LinkBuilder.prototype.mailBox = function (sFolder, iPage, sSearch)
{
	iPage = Utils.isNormal(iPage) ? Utils.pInt(iPage) : 1;
	sSearch = Utils.pString(sSearch);

	var sResult = this.sBase + 'mailbox/';
	if ('' !== sFolder)
	{
		sResult += encodeURI(sFolder);
	}
	if (1 < iPage)
	{
		sResult = sResult.replace(/[\/]+$/, '');
		sResult += '/p' + iPage;
	}
	if ('' !== sSearch)
	{
		sResult = sResult.replace(/[\/]+$/, '');
		sResult += '/' + encodeURI(sSearch);
	}

	return sResult;
};

/**
 * @return {string}
 */
LinkBuilder.prototype.phpInfo = function ()
{
	return this.sServer + 'Info';
};

/**
 * @param {string} sLang
 * @return {string}
 */
LinkBuilder.prototype.langLink = function (sLang)
{
	return this.sServer + '/Lang/0/' + encodeURI(sLang) + '/' + this.sVersion + '/';
};

/**
 * @param {string} sHash
 * @return {string}
 */
LinkBuilder.prototype.getUserPicUrlFromHash = function (sHash)
{
	return this.sServer + '/Raw/' + this.sSpecSuffix + '/UserPic/' + sHash + '/' + this.sVersion + '/';
};

/**
 * @return {string}
 */
LinkBuilder.prototype.emptyContactPic = function ()
{
	return ('' === this.sCdnStaticDomain ? 'rainloop/v/' : this.sCdnStaticDomain) +
		this.sVersion + '/static/css/images/empty-contact.png';
};

/**
 * @param {string} sFileName
 * @return {string}
 */
LinkBuilder.prototype.sound = function (sFileName)
{
	return ('' === this.sCdnStaticDomain ? 'rainloop/v/' : this.sCdnStaticDomain) +
		this.sVersion + '/static/sounds/' + sFileName;
};

/**
 * @param {string} sTheme
 * @return {string}
 */
LinkBuilder.prototype.themePreviewLink = function (sTheme)
{
	return ('' === this.sCdnStaticDomain ? 'rainloop/v/' : this.sCdnStaticDomain) +
		this.sVersion + '/themes/' + encodeURI(sTheme) + '/images/preview.png';
};

/**
 * @return {string}
 */
LinkBuilder.prototype.notificationMailIcon = function ()
{
	return ('' === this.sCdnStaticDomain ? 'rainloop/v/' : this.sCdnStaticDomain) +
		this.sVersion + '/static/css/images/icom-message-notification.png';
};

/**
 * @return {string}
 */
LinkBuilder.prototype.socialGoogle = function ()
{
	return this.sServer + 'SocialGoogle' + ('' !== this.sSpecSuffix ? '/' + this.sSpecSuffix + '/' : '');
};

/**
 * @return {string}
 */
LinkBuilder.prototype.socialTwitter = function ()
{
	return this.sServer + 'SocialTwitter' + ('' !== this.sSpecSuffix ? '/' + this.sSpecSuffix + '/' : '');
};

/**
 * @return {string}
 */
LinkBuilder.prototype.socialFacebook = function ()
{
	return this.sServer + 'SocialFacebook' + ('' !== this.sSpecSuffix ? '/' + this.sSpecSuffix + '/' : '');
};

const { Clutter } = imports.gi;
const Main = imports.ui.main;
const ExtensionUtils = imports.misc.extensionUtils;

function init() {
  this._originalBannerAlignment = Main.messageTray.bannerAlignment;
}

function enable() {

  this._settings = ExtensionUtils.getSettings('org.gnome.shell.extensions.notification-positioner');
  let xAlign = this._settings.get_string('banner-x-align');
  let yAlign = this._settings.get_string('banner-y-align');
  place(Clutter.ActorAlign[xAlign], Clutter.ActorAlign[yAlign]);

  this._xAlignSignal = this._settings.connect('changed::banner-x-align', () => {
    let x = this._settings.get_string('banner-x-align');
    let y = this._settings.get_string('banner-y-align');
    place(Clutter.ActorAlign[x], Clutter.ActorAlign[y]);
  });

  this._yAlignSignal = this._settings.connect('changed::banner-y-align', () => {
    let x = this._settings.get_string('banner-x-align');
    let y = this._settings.get_string('banner-y-align');
    place(Clutter.ActorAlign[x], Clutter.ActorAlign[y]);
  });

}

function disable() {
  this._settings.disconnect(this._xAlignSignal);
  this._settings.disconnect(this._yAlignSignal);
  Main.messageTray.bannerAlignment = this._originalBannerAlignment;
}

function place(x, y) {
  Main.messageTray._bannerBin.set_x_align(x);
  Main.messageTray._bannerBin.set_y_align(y);
}
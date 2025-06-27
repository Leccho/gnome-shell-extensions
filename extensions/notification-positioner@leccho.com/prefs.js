const { GObject, Gtk, Gio } = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;

function init() {
  // No specific initialization required for now
}

function buildPrefsWidget() {
  let settings = ExtensionUtils.getSettings('org.gnome.shell.extensions.notification-positioner');

  let widget = new Gtk.Grid({
    column_homogeneous: true,
    row_spacing: 10,
    column_spacing: 10,
    margin_start: 20,
    margin_end: 20,
    margin_top: 20,
    margin_bottom: 20,
  });

  let bannerXAlignLabel = new Gtk.Label({
    label: 'Horizontal alignment of the notification banner',
    halign: Gtk.Align.START,
  });

  let bannerXAlignCombo = new Gtk.ComboBoxText();
  bannerXAlignCombo.append('START', 'START');
  bannerXAlignCombo.append('CENTER', 'CENTER');
  bannerXAlignCombo.append('END', 'END');
  bannerXAlignCombo.set_active_id(settings.get_string('banner-x-align'));

  bannerXAlignCombo.connect('changed', (widget) => {
    settings.set_string('banner-x-align', widget.get_active_id());
  });

  widget.attach(bannerXAlignLabel, 0, 0, 1, 1);
  widget.attach(bannerXAlignCombo, 1, 0, 1, 1);

  let bannerYAlignLabel = new Gtk.Label({
    label: 'Vertical alignment of the notification banner',
    halign: Gtk.Align.START,
  });

  let bannerYAlignCombo = new Gtk.ComboBoxText();
  bannerYAlignCombo.append('START', 'START');
  bannerYAlignCombo.append('CENTER', 'CENTER');
  bannerYAlignCombo.append('END', 'END');
  bannerYAlignCombo.set_active_id(settings.get_string('banner-y-align'));

  bannerYAlignCombo.connect('changed', (widget) => {
    settings.set_string('banner-y-align', widget.get_active_id());
  });

  widget.attach(bannerYAlignLabel, 0, 1, 1, 1);
  widget.attach(bannerYAlignCombo, 1, 1, 1, 1);

  let separator = new Gtk.Separator({ orientation: Gtk.Orientation.HORIZONTAL });
  widget.attach(separator, 0, 2, 2, 1);

  let testButton = new Gtk.Button({ label: 'TEST NOTIFICATION', halign: Gtk.Align.END, width_request: 150 });
  testButton.connect('clicked', () => {
    Gio.Subprocess.new(['/usr/bin/notify-send', 'Test Notification', 'This is a test message'], Gio.SubprocessFlags.NONE);
  });
  widget.attach(testButton, 1, 3, 1, 1);

  return widget;
}


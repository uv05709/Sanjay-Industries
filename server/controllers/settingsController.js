import Settings from '../models/Settings.js';

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    } else {
      // Auto-migrate old placeholder values to real defaults
      let needsSave = false;
      if (settings.contactInfo?.phone?.includes('XXXXXXXXXX')) {
        settings.contactInfo.phone = '+91-7052409115';
        needsSave = true;
      }
      if (settings.contactInfo?.whatsapp?.includes('XXXXXXXXXX')) {
        settings.contactInfo.whatsapp = '917052409115';
        needsSave = true;
      }
      if (needsSave) {
        await settings.save();
      }
    }
    res.status(200).json({ success: true, settings });
  } catch (error) {
    next(error);
  }
};

// @desc    Update site settings (Admin)
// @route   PUT /api/settings
// @access  Private/Admin
export const updateSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings = await Settings.findOneAndUpdate({}, req.body, {
        new: true,
        runValidators: true,
      });
    }
    res.status(200).json({ success: true, settings });
  } catch (error) {
    next(error);
  }
};

const Testimony = require('../models/Testimony');

// @desc    Create a new testimony
// @route   POST /api/testimonies
// @access  Public
exports.createTestimony = async (req, res) => {
    try {
        const { author, title, content, category, isAnonymous } = req.body;

        const testimony = await Testimony.create({
            author,
            title,
            content,
            category,
            isAnonymous
        });

        res.status(201).json({ success: true, data: testimony });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all approved testimonies
// @route   GET /api/testimonies
// @access  Public
exports.getTestimonies = async (req, res) => {
    try {
        const { category, page = 1, limit = 10 } = req.query;
        
        const query = { isApproved: true };
        if (category) query.category = category;

        const testimonies = await Testimony.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Testimony.countDocuments(query);

        res.json({
            success: true,
            data: testimonies,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single testimony
// @route   GET /api/testimonies/:id
// @access  Public
exports.getTestimony = async (req, res) => {
    try {
        const testimony = await Testimony.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!testimony) {
            return res.status(404).json({ success: false, message: 'Testimony not found' });
        }

        res.json({ success: true, data: testimony });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update testimony approval status
// @route   PATCH /api/testimonies/:id/approve
// @access  Private/Admin
exports.approveTestimony = async (req, res) => {
    try {
        const { isApproved } = req.body;
        const testimony = await Testimony.findByIdAndUpdate(
            req.params.id,
            { isApproved },
            { new: true }
        );

        if (!testimony) {
            return res.status(404).json({ success: false, message: 'Testimony not found' });
        }

        res.json({ success: true, data: testimony });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete testimony
// @route   DELETE /api/testimonies/:id
// @access  Private/Admin
exports.deleteTestimony = async (req, res) => {
    try {
        const testimony = await Testimony.findByIdAndDelete(req.params.id);
        if (!testimony) {
            return res.status(404).json({ success: false, message: 'Testimony not found' });
        }
        res.json({ success: true, message: 'Testimony deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all testimonies (including unapproved)
// @route   GET /api/testimonies/admin/all
// @access  Private/Admin
exports.getAllTestimonies = async (req, res) => {
    try {
        const testimonies = await Testimony.find().sort({ createdAt: -1 });
        res.json({ success: true, data: testimonies });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Like a testimony
// @route   POST /api/testimonies/:id/like
// @access  Public
exports.likeTestimony = async (req, res) => {
    try {
        const testimony = await Testimony.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );

        if (!testimony) {
            return res.status(404).json({ success: false, message: 'Testimony not found' });
        }

        res.json({ success: true, data: testimony });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
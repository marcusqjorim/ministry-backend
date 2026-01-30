const Partner = require("../models/Partner");

// Register new partner
exports.registerPartner = async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      address, 
      gender, 
      dateOfBirth, 
      salvationExperience, 
      howHeard, 
      interests, 
      skills, 
      comments 
    } = req.body;

    const partnerExists = await Partner.findOne({ email });
    if (partnerExists) {
      return res.status(400).json({ success: false, message: "Partner with this email already exists" });
    }

    const partner = await Partner.create({
      firstName,
      lastName,
      email,
      phone,
      address,
      gender,
      dateOfBirth,
      salvationExperience,
      howHeard,
      interests,
      skills,
      comments,
    });

    if (partner) {
      res.status(201).json({
        success: true,
        message: "Thank you for partnering with us! We'll be in touch soon.",
        partner: {
          id: partner._id,
          firstName: partner.firstName,
          lastName: partner.lastName,
          email: partner.email,
        },
      });
    }
  } catch (error) {
    console.error("Partner registration error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all partners (admin only)
exports.getPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update partner status
exports.updatePartnerStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const partner = await Partner.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true }
    );

    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    res.json(partner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete partner
exports.deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }
    res.json({ message: "Partner deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

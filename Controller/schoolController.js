const db = require('../db');
const { schoolSchema } = require('../validatiors/schoolValidator');
const { calculateDistance } = require('../utils/distanceCalculator');

exports.addSchool = async (req, res) => {
  try {
    const { error, value } = schoolSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, address, latitude, longitude } = value;

    await db.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );

    res.status(201).json({ message: 'School added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and Longitude are required' });
    }

    const [schools] = await db.execute('SELECT * FROM schools');

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    const schoolsWithDistance = schools.map(school => ({
      ...school,
      distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
    }));

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.json(schoolsWithDistance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

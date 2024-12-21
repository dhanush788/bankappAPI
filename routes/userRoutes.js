const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const supabase = req.supabase;

    const { data, error } = await supabase.from('customers').select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
}
);

router.get('/:id', async (req, res) => {
    const supabase = req.supabase;
    const { id } = req.params;

    const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('uid', id);
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    if (!data || data.length === 0) {
        return res.json([]);
    }

    res.json(data[0]);
});


router.post('/', async (req, res) => {
    const supabase = req.supabase;

    const { uid, account_number, interest_rate, tenure, emi_due } = req.body;
    if (!uid || !account_number || !interest_rate || !tenure || !emi_due) {
        return res.status(400).json({ error: 'Please provide all fields' });
    }
    const { data, error } = await supabase
        .from('customers')
        .insert([
            { uid, account_number, interest_rate, tenure, emi_due }
        ]);

    if (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;

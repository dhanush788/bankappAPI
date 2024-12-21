const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const supabase = req.supabase;
    const { data, error } = await supabase.from('payments').select('*');
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json(data);
});

router.post('/', async (req, res) => {
    const supabase = req.supabase;
    const { customer_id, payment_amount, status } = req.body;
    const payment_date = new Date();
    if (!customer_id || !payment_amount || !status) {
        return res.status(400).json({ error: 'Please provide all fields' });
    }
    const { data, error } = await supabase
        .from('payments')
        .insert([
            { customer_id, payment_amount, payment_date, status }
        ])
        .select();

        if (error) {
            return res.status(500).json({ error: error.message });
        }
        let payment_id = data[0].id;
        res.status(200).json({ message: "Payment submitted successfully" , payment_id: payment_id});
});

router.get('/:id', async (req, res) => {
    const supabase = req.supabase;
    const { id } = req.params;
    const { data, error } = await supabase.from('payments')
        .select('*')
        .eq('customer_id', id);
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    if (!data || data.length === 0) {
        return res.json([]);
    }
    res.json(data);
});

module.exports = router;

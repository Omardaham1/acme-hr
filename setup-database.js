const pool = require('./database');

const setupDatabase = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Create the employees table
        await client.query(`
            CREATE TABLE IF NOT EXISTS employees (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                is_admin BOOLEAN NOT NULL
            )
        `);

        // Seed sample data
        await client.query(`
            INSERT INTO employees (name, is_admin)
            VALUES
            ('Alice Johnson', true),
            ('Bob Smith', false),
            ('Charlie Davis', false)
            ON CONFLICT (id) DO NOTHING
        `);

        await client.query('COMMIT');
        console.log('Database setup complete');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error setting up database', err);
    } finally {
        client.release();
    }
};

setupDatabase().catch(console.error);
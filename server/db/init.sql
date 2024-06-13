CREATE TABLE IF NOT EXISTS locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL
);


CREATE TABLE IF NOT EXISTS vehicles (
    id SERIAL PRIMARY KEY,
    driver_name VARCHAR(50) NOT NULL,
    current_location_id INTEGER REFERENCES locations(id)
---    model text NOT NULL;
);

INSERT INTO locations (name, latitude, longitude) VALUES
    ('Atlanta', 33.748889, -84.390000),
    ('Boston', 42.360278, -71.057778),
    ('Chicago', 41.881944, -87.627778),
    ('Denver', 39.7392, -104.9849);

INSERT INTO vehicles (driver_name, current_location_id) VALUES
    ('Alice', 1),
    ('Bob', 2),
    ('Charlie', 3),
    ('Daniel', 4);



jest.mock('../sql/connection');
// jest.mock('../controllers/petsController');

const {searchLostPets} = require('../controllers/petsController');

const expected = [
    {
        "report_id": 6,
        "fk_user_id": 4,
        "file_name": "hamster_recognises_as_rat_brown_and_white_on_white_background.jpg",
        "location_x": 100,
        "location_y": -100,
        "report_date": "2020-10-24T05:45:00.000Z",
        "tags": "[\"Animal\",\"Rodent\",\"Mammal\",\"Rat\",\"Hamster\",\"Pet\"]"
    },
    {
        "report_id": 7,
        "fk_user_id": 8,
        "file_name": "Labrador_Retriever_puppy_black_on_white_background.jpg",
        "location_x": 100,
        "location_y": -100,
        "report_date": "2020-10-24T05:45:00.000Z",
        "tags": "[\"Dog\",\"Animal\",\"Pet\",\"Canine\",\"Mammal\",\"Labrador Retriever\",\"Plant\",\"Puppy\"]"
    },
    {
        "report_id": 8,
        "fk_user_id": 9,
        "file_name": "golden_retriever_1.jpg",
        "location_x": 100,
        "location_y": -100,
        "report_date": "2020-10-24T05:45:00.000Z",
        "tags": "[\"Golden Retriever\",\"Dog\",\"Mammal\",\"Pet\",\"Animal\",\"Canine\",\"Plant\",\"Grass\",\"Puppy\",\"Petal\"]"
    },
    {
        "report_id": 9,
        "fk_user_id": 2,
        "file_name": "Golden_Retriever_or_Labrador Retriever_gold_on_black_background.jpg",
        "location_x": 100,
        "location_y": -100,
        "report_date": "2020-10-24T05:45:00.000Z",
        "tags": "[\"Canine\",\"Pet\",\"Animal\",\"Mammal\",\"Dog\",\"Puppy\",\"Golden Retriever\",\"Labrador Retriever\"]"
    }
]

test('search all Lost Pets', async() => {
    // const req = {};
    // const res = {};
    // var res = something;
    // res.status = jest.fn();
    // res.send = jest.fn((dataPackets) => dataPackets);
    const dataPackets = await searchLostPets();
    expect(dataPackets).toStrictEqual(expected);
});
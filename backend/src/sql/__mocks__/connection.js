const query = ()=>{
    return [
        [
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
        ],
        {
            "fieldCount": 0,
            "affectedRows": 0,
            "insertId": 0,
            "serverStatus": 34,
            "warningCount": 0,
            "message": "",
            "protocol41": true,
            "changedRows": 0
        }
    ]
}

exports.query = query;
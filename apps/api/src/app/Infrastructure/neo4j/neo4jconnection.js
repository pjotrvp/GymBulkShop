(async() => {
    const neo4j = require('neo4j-driver');

    const uri = 'neo4j+s://64541d6d.databases.neo4j.io';
    const user = 'neo4j';
    const password = 'YyXVVqzlZ1q68J5TE5Sws-epRg24q1UiRYzjnkyUSuw';
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

    try{
        const user1Name = 'Alice';
        const user2Name = 'Bob';

        await createRelationship(driver, user1Name, user2Name);

        await findUser(driver, user1Name);
        await findUser(driver, user2Name);

    } catch (error) {
        console.log(`Something went wrong: ${error}`);
    } finally {
        await driver.close();
    }

    async function createRelationship(driver, user1Name, user2Name) {
        const session = driver.session({database: 'neo4j'});

        try {
            const result = await session.run(
                'MATCH (a:User {name: $user1Name}), (b:User {name: $user2Name}) MERGE (a)-[:KNOWS]->(b)',
                {user1Name, user2Name}
            );
        } finally {
            await session.close();
        }
    }

    async function addSupplement(driver, supplementName) {
        const session = driver.session({database: 'neo4j'});

        try {
            const result = await session.run(
                'CREATE (a:Supplement {name: $supplementName})',
                {supplementName}
            );
        } finally {
            await session.close();
        }
    }

    async function findUser(driver, userName) {
        const session = driver.session();

        try {
            const result = await session.run(
                'MATCH (user:User {name: $userName}) RETURN user',
                {userName}
            );

            const singleRecord = result.records[0];
            const node = singleRecord.get(0);

            console.log(node.properties.name);
        } finally {
            await session.close();
        }
    }


})
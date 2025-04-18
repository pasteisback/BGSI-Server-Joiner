const PLACE_ID = 85896571713843; // BGSI's Roblox place ID

async function findServer() {
    const playerCount = parseInt(document.getElementById("playerCount").value);
    const statusElement = document.getElementById("status");
    
    if (isNaN(playerCount) || playerCount < 1) {
        statusElement.textContent = "❌ Please enter a valid number of players.";
        return;
    }

    statusElement.textContent = "🔍 Searching for server...";
    const url = `https://games.roblox.com/v1/games/${PLACE_ID}/servers/Public?limit=100&sortOrder=Asc`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch servers.");
        }

        const data = await response.json();
        const server = data.data.find(server => server.playing === playerCount);

        if (server) {
            statusElement.textContent = `✅ Server found! Redirecting...`;
            const joinUrl = `https://www.roblox.com/games/start?placeId=${PLACE_ID}&gameId=${server.id}`;
            window.open(joinUrl, "_blank");
        } else {
            statusElement.textContent = "❌ No matching server found.";
        }
    } catch (error) {
        statusElement.textContent = `❌ Error: ${error.message}`;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Estados del jugador y enemigo
    const playerHP = 100;
    const enemyHP = 100;
    const healingItem = { name: "Poción", healAmount: 20 };
    const weapon = { name: "Espada", attackBoost: 15 };
    let playerCurrentHP = playerHP;
    let enemyCurrentHP = enemyHP;
    let equippedWeapon = null;

    // Elementos del DOM
    const playerStats = document.getElementById("player-stats");
    const enemyStats = document.getElementById("enemy-stats");
    const log = document.getElementById("log");

    const updateStats = () => {
        playerStats.textContent = `Jugador: HP ${playerCurrentHP}`;
        enemyStats.textContent = `Enemigo: HP ${enemyCurrentHP}`;
    };

    const logMessage = (message) => {
        log.textContent = message;
    };

    const attackEnemy = () => {
        const baseDamage = 10;
        const damage = equippedWeapon ? baseDamage + weapon.attackBoost : baseDamage;
        const actualDamage = Math.floor(Math.random() * damage) + 10;
        enemyCurrentHP -= actualDamage;
        enemyCurrentHP = Math.max(0, enemyCurrentHP);
        logMessage(`¡Atacas al enemigo causando ${actualDamage} de daño!`);
        updateStats();
        if (enemyCurrentHP === 0) {
            logMessage("¡Has derrotado al enemigo!");
            disableButtons();
        } else {
            enemyAttack();
        }
    };

    const defendPlayer = () => {
        logMessage("Te preparas para defender.");
        enemyAttack();
    };

    const useItem = () => {
        playerCurrentHP += healingItem.healAmount;
        playerCurrentHP = Math.min(playerHP, playerCurrentHP);
        logMessage(`¡Usas una ${healingItem.name} y recuperas ${healingItem.healAmount} HP!`);
        updateStats();
        enemyAttack();
    };

    const equipWeapon = () => {
        equippedWeapon = weapon;
        logMessage(`¡Has equipado la ${weapon.name}!`);
    };

    const enemyAttack = () => {
        const damage = Math.floor(Math.random() * 15) + 5;
        playerCurrentHP -= damage;
        playerCurrentHP = Math.max(0, playerCurrentHP);
        logMessage(`El enemigo te ataca causando ${damage} de daño.`);
        updateStats();
        if (playerCurrentHP === 0) {
            logMessage("¡Has sido derrotado!");
            disableButtons();
        }
    };

    const disableButtons = () => {
        document.getElementById("attack").disabled = true;
        document.getElementById("defend").disabled = true;
        document.getElementById("use-item").disabled = true;
        document.getElementById("equip-weapon").disabled = true;
    };

    document.getElementById("attack").addEventListener("click", attackEnemy);
    document.getElementById("defend").addEventListener("click", defendPlayer);
    document.getElementById("use-item").addEventListener("click", useItem);
    document.getElementById("equip-weapon").addEventListener("click", equipWeapon);

    updateStats();
});

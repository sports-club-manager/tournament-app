<script>
    import leaguesort from "@sports-club-manager/leaguesort";

    import { highlight } from "$lib/stores";

    export let results = [];

    $: tableEntries = leaguesort.calculateTable(results);
</script>

<table class="table tp">
    <thead>
        <tr>
            <th class="text-left">Team</th>
            <th class="text-right">Pld</th>
            <th class="text-right">W</th>
            <th class="text-right">D</th>
            <th class="text-right">L</th>
            <th class="text-right">+/-</th>
            <th class="text-right">GD</th>
            <th class="text-right">Pts</th>
        </tr>
    </thead>
    <tbody>
        {#each tableEntries as entry}
            <tr>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <td
                    on:click={() => {
                        $highlight = $highlight == entry.name ? "" : entry.name;
                    }}
                    class="text-left"
                    class:team-highlight={$highlight == entry.name}>{entry.name}</td
                >
                <td class="text-right">{entry.played}</td>
                <td class="text-right">{entry.won}</td>
                <td class="text-right">{entry.drawn}</td>
                <td class="text-right">{entry.lost}</td>
                <td style="white-space: nowrap;" class="text-right">{entry.goalsFor}-{entry.goalsAgainst}</td>
                <td class="text-right">{entry.goalsFor - entry.goalsAgainst}</td>
                <td class="text-right points">{entry.points}</td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table,
    .table {
        border-width: 0;
        width: 100%;
        border-collapse: collapse;
    }
    .table thead tr,
    .table th {
        font-weight: normal;
    }
</style>

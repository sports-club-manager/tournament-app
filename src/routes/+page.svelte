<script>
    import AgeFab from "$lib/components/AgeFab.svelte";
    import Section from "$lib/components/Section.svelte";
    import { goto } from "$app/navigation";
    import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
    import IconButton, { Icon } from "@smui/icon-button";
    import List, { Item, Graphic, Text } from "@smui/list";

    let tournament = {};
    let isOpen = [];
    let ageGroups = [];

    export let data;

    $: {
        tournament = data.tournament;
        ageGroups = tournament.competitions.reduce(
            (comps, comp) => (comps.find((x) => x.name === comp.name) ? [...comps] : [...comps, comp]),
            []
        );
    }
</script>

<svelte:head>
    <title>{tournament.name}</title>
</svelte:head>

<Section container={false}>
    <div slot="section-head" class="index-head">
        <h1>{tournament.name}</h1>
        <blockquote>
            <p>{tournament.description}</p>
            <p style="font-size: smaller"><em>Select a competition below to view fixtures and results</em></p>
        </blockquote>
    </div>

    <div slot="section-body">
        <div class="accordion-container">
            <Accordion>
                {#each ageGroups as ag, i}
                    <Panel bind:open={isOpen[i]}>
                        <Header>
                            <AgeFab name={ag.name} />
                            <span class="header">All {ag.name} competitions</span>
                            <!-- <br><small>Saturday morning</small> -->
                            <IconButton slot="icon" toggle pressed={isOpen[i]} aria-label={`Expand ${ag.name} Section`}>
                                <Icon class="material-icons" on>expand_less</Icon>
                                <Icon class="material-icons">expand_more</Icon>
                            </IconButton>
                        </Header>
                        <Content>
                            <List dense>
                                {#each tournament.competitions as comp}
                                    {#if comp.name == ag.name}
                                        <Item on:SMUI:action={() => goto(`/competitions/${comp.name}/${comp.section}`)}>
                                            <Graphic class="material-icons">sports_soccer</Graphic>
                                            <Text><strong>{comp.section} Section</strong> ({comp.groups} groups)</Text>
                                        </Item>
                                    {/if}
                                {/each}
                            </List>
                        </Content>
                    </Panel>
                {/each}
            </Accordion>
        </div>
    </div>
</Section>

<style>
    .index-head {
        background-origin: content-box;
        background-image: url("/icons/icon-512x512.webp");
        background-size: 7rem;
        background-position: top right;
        background-repeat: no-repeat;
        padding: 0;
    }

    span.header {
        font-size: 1.2em;
    }

    @media (max-width: 600px) {
        .index-head {
            background-size: 5rem;
            max-width: 100%;
        }
    }

    blockquote {
        max-width: 70%;
        font: normal italic larger Arial;
        line-height: 1.5em;
        padding-left: 12px;
    }

    h1 {
        max-width: 82%;
    }
</style>

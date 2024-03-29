<script>
    import { onMount } from "svelte";

    import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
    import IconButton from "@smui/icon-button";
    import Kitchen from "@smui/snackbar/kitchen";

    import { page } from "$app/stores";
    import MenuDrawer from "$lib/components/MenuDrawer.svelte";
    import PageTransition from "$lib/components/PageTransition.svelte";
    import { io } from "$lib/socket-client";

    let drawerOpen = false;
    let user = $page.data.session?.user;
    let kitchen;

    export let data;
    $: ({ routeKey, tournament, pages } = data);

    // ----------------------------------------------------------------------

    onMount(() => {
        io.on("save-news", (news) => {
            kitchen.push({
                label: `${news.title}:- ${news.body}`,
                dismissButton: true,
            });
        });
    });
</script>

<svelte:head>
    <meta name="description" content="{tournament.name} results and league tables" />
    <meta name="author" content="{tournament.club} and SCM" />
    <meta name="theme-color" content={tournament.primaryColour || "#0a0"} />
    <meta name="apple-mobile-web-app-status-bar-style" content={tournament.primaryColour || "#0a0"} />
    <meta name="apple-mobile-web-app-title" content={tournament.name} />
</svelte:head>

<MenuDrawer bind:open={drawerOpen} {tournament} {pages} {user} />

<div class="flex-layout">
    <main>
        <TopAppBar variant="standard" dense>
            <Row>
                <Section>
                    <IconButton class="material-icons" on:click={() => (drawerOpen = !drawerOpen)}>menu</IconButton>
                    <Title>{tournament.name}</Title>
                </Section>
                <Section align="end" toolbar>
                    <a href="/"><IconButton class="material-icons" aria-label="Home">home</IconButton></a>
                </Section>
            </Row>
        </TopAppBar>
    </main>

    <PageTransition refresh={routeKey}>
        <section id="slot">
            <slot />
        </section>
    </PageTransition>

    <Kitchen bind:this={kitchen} dismiss$class="material-icons" />

    <section id="footer">
        <p>&copy; Darren Davison &amp; <a href={tournament.siteUrl}>{tournament.club}</a> 2023</p>
    </section>
</div>

<style global lang="scss">
    @use "@material/typography/index" as typography;
    @use "@material/typography/mdc-typography";

    html,
    body {
        height: 100%;
        margin: 0;
        font-family: "Roboto", sans-serif !important;
        background: url(/images/background.jpg) no-repeat fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }

    h1 {
        @include typography.typography("headline2");
        font-family: "Roboto Condensed";
        margin: 0;
    }
    h2 {
        @include typography.typography("headline3");
        font-family: "Roboto Condensed";
        margin: 0;
    }
    h3 {
        @include typography.typography("headline4");
        font-family: "Roboto Condensed";
        margin: 0;
    }
    h4 {
        @include typography.typography("headline4");
        font-family: "Roboto Condensed";
        margin: 0;
    }
    h5 {
        @include typography.typography("headline5");
        font-family: "Roboto Condensed";
        margin: 0;
    }
    h6 {
        @include typography.typography("headline6");
        font-family: "Roboto Condensed";
        margin: 0;
    }

    .text-center {
        text-align: center;
    }
    .text-right {
        text-align: right;
    }
    .text-left {
        text-align: left;
    }
    .text-muted {
        color: #aaa;
    }

    .flex-layout {
        flex-direction: column;
        min-height: 100vh;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-between;
    }

    #slot {
        padding-top: 38px;
        margin: 10px auto;
        max-width: 1860px;
        width: 100%;
        min-height: 81vh;
    }

    #footer {
        padding: 2.9em 0;
        margin: 0;
        text-align: center;
        font-size: smaller;
        color: #f5f5f5;
    }

    #footer a {
        color: #f5f5f5;
        border-bottom: 1px dotted #f5f5f5;
        text-decoration: none;
    }

    @media (max-width: 464px) {
        html,
        body {
            font-size: small;
        }
        .smui-paper {
            padding: 12px 8px;
        }
        .table > tbody > tr > td,
        .table > thead > tr > th {
            padding: 3px 6px;
            line-height: 1.4;
        }
    }

    @media (min-width: 394px) {
        .table > tbody > tr > td,
        .table > thead > tr > th {
            padding: 5px 10px;
            line-height: 1.4;
        }
        .smui-paper {
            padding: 24px 16px;
        }
    }

    @media (min-width: 839px) {
        .table > tbody > tr > td,
        .table > thead > tr > th {
            padding: 8px 12px;
            line-height: 1.4;
        }
    }

    @media print {
        .no-print {
            display: none;
        }
        .table {
            page-break-after: always;
            page-break-inside: avoid;
        }
        body {
            padding-top: 0px; 
        }
    }
</style>

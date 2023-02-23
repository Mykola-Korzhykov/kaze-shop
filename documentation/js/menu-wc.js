'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">kazi.shop-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AdminModule-4d63226fa8a3ad182f14d1911a4f1de6dbe639f68fcd43c46af2fd37c64880a449742de7becc30f580e3e879bac4a07c917b84419522cb6b73686bfcba44ccac"' : 'data-target="#xs-controllers-links-module-AdminModule-4d63226fa8a3ad182f14d1911a4f1de6dbe639f68fcd43c46af2fd37c64880a449742de7becc30f580e3e879bac4a07c917b84419522cb6b73686bfcba44ccac"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AdminModule-4d63226fa8a3ad182f14d1911a4f1de6dbe639f68fcd43c46af2fd37c64880a449742de7becc30f580e3e879bac4a07c917b84419522cb6b73686bfcba44ccac"' :
                                            'id="xs-controllers-links-module-AdminModule-4d63226fa8a3ad182f14d1911a4f1de6dbe639f68fcd43c46af2fd37c64880a449742de7becc30f580e3e879bac4a07c917b84419522cb6b73686bfcba44ccac"' }>
                                            <li class="link">
                                                <a href="controllers/AdminController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AdminModule-4d63226fa8a3ad182f14d1911a4f1de6dbe639f68fcd43c46af2fd37c64880a449742de7becc30f580e3e879bac4a07c917b84419522cb6b73686bfcba44ccac"' : 'data-target="#xs-injectables-links-module-AdminModule-4d63226fa8a3ad182f14d1911a4f1de6dbe639f68fcd43c46af2fd37c64880a449742de7becc30f580e3e879bac4a07c917b84419522cb6b73686bfcba44ccac"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdminModule-4d63226fa8a3ad182f14d1911a4f1de6dbe639f68fcd43c46af2fd37c64880a449742de7becc30f580e3e879bac4a07c917b84419522cb6b73686bfcba44ccac"' :
                                        'id="xs-injectables-links-module-AdminModule-4d63226fa8a3ad182f14d1911a4f1de6dbe639f68fcd43c46af2fd37c64880a449742de7becc30f580e3e879bac4a07c917b84419522cb6b73686bfcba44ccac"' }>
                                        <li class="link">
                                            <a href="injectables/AdminJwtRefreshService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminJwtRefreshService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AdminService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CurrencyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CurrencyService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OwnerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OwnerService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TasksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-2119b9ea2e9cc0bad1ca6c27fd14925f04a86a0a7afc4d120196df103b68c3dea5dce77406ed40d0b2487984629ca44b6f4c3b356257058ca420a79784ec4130"' : 'data-target="#xs-controllers-links-module-AppModule-2119b9ea2e9cc0bad1ca6c27fd14925f04a86a0a7afc4d120196df103b68c3dea5dce77406ed40d0b2487984629ca44b6f4c3b356257058ca420a79784ec4130"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-2119b9ea2e9cc0bad1ca6c27fd14925f04a86a0a7afc4d120196df103b68c3dea5dce77406ed40d0b2487984629ca44b6f4c3b356257058ca420a79784ec4130"' :
                                            'id="xs-controllers-links-module-AppModule-2119b9ea2e9cc0bad1ca6c27fd14925f04a86a0a7afc4d120196df103b68c3dea5dce77406ed40d0b2487984629ca44b6f4c3b356257058ca420a79784ec4130"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-2119b9ea2e9cc0bad1ca6c27fd14925f04a86a0a7afc4d120196df103b68c3dea5dce77406ed40d0b2487984629ca44b6f4c3b356257058ca420a79784ec4130"' : 'data-target="#xs-injectables-links-module-AppModule-2119b9ea2e9cc0bad1ca6c27fd14925f04a86a0a7afc4d120196df103b68c3dea5dce77406ed40d0b2487984629ca44b6f4c3b356257058ca420a79784ec4130"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-2119b9ea2e9cc0bad1ca6c27fd14925f04a86a0a7afc4d120196df103b68c3dea5dce77406ed40d0b2487984629ca44b6f4c3b356257058ca420a79784ec4130"' :
                                        'id="xs-injectables-links-module-AppModule-2119b9ea2e9cc0bad1ca6c27fd14925f04a86a0a7afc4d120196df103b68c3dea5dce77406ed40d0b2487984629ca44b6f4c3b356257058ca420a79784ec4130"' }>
                                        <li class="link">
                                            <a href="injectables/AppClusterService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppClusterService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TasksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-1ab7c870d4efef78627676b42e684a3b2320862fcb44f8fbf4a59e360059617a697973e0144ec759664d6a1686cf9a6a1e1eeda373c607e57511a95bbe6d0b2e"' : 'data-target="#xs-controllers-links-module-AuthModule-1ab7c870d4efef78627676b42e684a3b2320862fcb44f8fbf4a59e360059617a697973e0144ec759664d6a1686cf9a6a1e1eeda373c607e57511a95bbe6d0b2e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-1ab7c870d4efef78627676b42e684a3b2320862fcb44f8fbf4a59e360059617a697973e0144ec759664d6a1686cf9a6a1e1eeda373c607e57511a95bbe6d0b2e"' :
                                            'id="xs-controllers-links-module-AuthModule-1ab7c870d4efef78627676b42e684a3b2320862fcb44f8fbf4a59e360059617a697973e0144ec759664d6a1686cf9a6a1e1eeda373c607e57511a95bbe6d0b2e"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-1ab7c870d4efef78627676b42e684a3b2320862fcb44f8fbf4a59e360059617a697973e0144ec759664d6a1686cf9a6a1e1eeda373c607e57511a95bbe6d0b2e"' : 'data-target="#xs-injectables-links-module-AuthModule-1ab7c870d4efef78627676b42e684a3b2320862fcb44f8fbf4a59e360059617a697973e0144ec759664d6a1686cf9a6a1e1eeda373c607e57511a95bbe6d0b2e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-1ab7c870d4efef78627676b42e684a3b2320862fcb44f8fbf4a59e360059617a697973e0144ec759664d6a1686cf9a6a1e1eeda373c607e57511a95bbe6d0b2e"' :
                                        'id="xs-injectables-links-module-AuthModule-1ab7c870d4efef78627676b42e684a3b2320862fcb44f8fbf4a59e360059617a697973e0144ec759664d6a1686cf9a6a1e1eeda373c607e57511a95bbe6d0b2e"' }>
                                        <li class="link">
                                            <a href="injectables/AdminJwtRefreshService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminJwtRefreshService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AppListener.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppListener</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CurrencyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CurrencyService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OwnerJwtRefreshService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OwnerJwtRefreshService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TasksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CartModule.html" data-type="entity-link" >CartModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CartModule-19e11f12f98e3da8d51623c0a3667542a058662ffb3513e21eca3d3915aa7816d3c89bd576113185289bd2ef874cebdde29b5c0ba445c4fbca06b1cb3f236978"' : 'data-target="#xs-controllers-links-module-CartModule-19e11f12f98e3da8d51623c0a3667542a058662ffb3513e21eca3d3915aa7816d3c89bd576113185289bd2ef874cebdde29b5c0ba445c4fbca06b1cb3f236978"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CartModule-19e11f12f98e3da8d51623c0a3667542a058662ffb3513e21eca3d3915aa7816d3c89bd576113185289bd2ef874cebdde29b5c0ba445c4fbca06b1cb3f236978"' :
                                            'id="xs-controllers-links-module-CartModule-19e11f12f98e3da8d51623c0a3667542a058662ffb3513e21eca3d3915aa7816d3c89bd576113185289bd2ef874cebdde29b5c0ba445c4fbca06b1cb3f236978"' }>
                                            <li class="link">
                                                <a href="controllers/CardController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CartModule-19e11f12f98e3da8d51623c0a3667542a058662ffb3513e21eca3d3915aa7816d3c89bd576113185289bd2ef874cebdde29b5c0ba445c4fbca06b1cb3f236978"' : 'data-target="#xs-injectables-links-module-CartModule-19e11f12f98e3da8d51623c0a3667542a058662ffb3513e21eca3d3915aa7816d3c89bd576113185289bd2ef874cebdde29b5c0ba445c4fbca06b1cb3f236978"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CartModule-19e11f12f98e3da8d51623c0a3667542a058662ffb3513e21eca3d3915aa7816d3c89bd576113185289bd2ef874cebdde29b5c0ba445c4fbca06b1cb3f236978"' :
                                        'id="xs-injectables-links-module-CartModule-19e11f12f98e3da8d51623c0a3667542a058662ffb3513e21eca3d3915aa7816d3c89bd576113185289bd2ef874cebdde29b5c0ba445c4fbca06b1cb3f236978"' }>
                                        <li class="link">
                                            <a href="injectables/CardService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesColoursModule.html" data-type="entity-link" >CategoriesColoursModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CategoriesColoursModule-16544c3ec38b3f6d593c689d666892fc391cbf848bd358632470536667950d0ba1d8c9649358a27a00741070f5186107752a5ed793e8e376bd1f761ab17dedc9"' : 'data-target="#xs-controllers-links-module-CategoriesColoursModule-16544c3ec38b3f6d593c689d666892fc391cbf848bd358632470536667950d0ba1d8c9649358a27a00741070f5186107752a5ed793e8e376bd1f761ab17dedc9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoriesColoursModule-16544c3ec38b3f6d593c689d666892fc391cbf848bd358632470536667950d0ba1d8c9649358a27a00741070f5186107752a5ed793e8e376bd1f761ab17dedc9"' :
                                            'id="xs-controllers-links-module-CategoriesColoursModule-16544c3ec38b3f6d593c689d666892fc391cbf848bd358632470536667950d0ba1d8c9649358a27a00741070f5186107752a5ed793e8e376bd1f761ab17dedc9"' }>
                                            <li class="link">
                                                <a href="controllers/CategoriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/ColoursController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ColoursController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CategoriesColoursModule-16544c3ec38b3f6d593c689d666892fc391cbf848bd358632470536667950d0ba1d8c9649358a27a00741070f5186107752a5ed793e8e376bd1f761ab17dedc9"' : 'data-target="#xs-injectables-links-module-CategoriesColoursModule-16544c3ec38b3f6d593c689d666892fc391cbf848bd358632470536667950d0ba1d8c9649358a27a00741070f5186107752a5ed793e8e376bd1f761ab17dedc9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoriesColoursModule-16544c3ec38b3f6d593c689d666892fc391cbf848bd358632470536667950d0ba1d8c9649358a27a00741070f5186107752a5ed793e8e376bd1f761ab17dedc9"' :
                                        'id="xs-injectables-links-module-CategoriesColoursModule-16544c3ec38b3f6d593c689d666892fc391cbf848bd358632470536667950d0ba1d8c9649358a27a00741070f5186107752a5ed793e8e376bd1f761ab17dedc9"' }>
                                        <li class="link">
                                            <a href="injectables/CategoriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ColoursService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ColoursService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CoreModule-2f91d8bd35a6a2149aa7bd8f5ce529d2763e8cb9d637a99259c80a4be649f30c0e26c5516036828159abc3a6338a94ddb103edd302e57e5f2eaf0187d7c04a49"' : 'data-target="#xs-injectables-links-module-CoreModule-2f91d8bd35a6a2149aa7bd8f5ce529d2763e8cb9d637a99259c80a4be649f30c0e26c5516036828159abc3a6338a94ddb103edd302e57e5f2eaf0187d7c04a49"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoreModule-2f91d8bd35a6a2149aa7bd8f5ce529d2763e8cb9d637a99259c80a4be649f30c0e26c5516036828159abc3a6338a94ddb103edd302e57e5f2eaf0187d7c04a49"' :
                                        'id="xs-injectables-links-module-CoreModule-2f91d8bd35a6a2149aa7bd8f5ce529d2763e8cb9d637a99259c80a4be649f30c0e26c5516036828159abc3a6338a94ddb103edd302e57e5f2eaf0187d7c04a49"' }>
                                        <li class="link">
                                            <a href="injectables/AppClusterService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppClusterService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CurrencyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CurrencyService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TasksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MailModule-7a81eadb6a054ae7135d31af7e3eb49ff1e3e794bfa129a71b66bdb524be71be6316cce591f97147f5d32cccfaf348e536d7737c5c1043793dda19f9f6a624f8"' : 'data-target="#xs-injectables-links-module-MailModule-7a81eadb6a054ae7135d31af7e3eb49ff1e3e794bfa129a71b66bdb524be71be6316cce591f97147f5d32cccfaf348e536d7737c5c1043793dda19f9f6a624f8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-7a81eadb6a054ae7135d31af7e3eb49ff1e3e794bfa129a71b66bdb524be71be6316cce591f97147f5d32cccfaf348e536d7737c5c1043793dda19f9f6a624f8"' :
                                        'id="xs-injectables-links-module-MailModule-7a81eadb6a054ae7135d31af7e3eb49ff1e3e794bfa129a71b66bdb524be71be6316cce591f97147f5d32cccfaf348e536d7737c5c1043793dda19f9f6a624f8"' }>
                                        <li class="link">
                                            <a href="injectables/AdminService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OwnerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OwnerService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrdersModule.html" data-type="entity-link" >OrdersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-OrdersModule-10ed16faaa0c110e00646a59cd4698c57e142787ff97663f067e01c8d0c9b74b9e80bcdeb7bf0715d69f430801bf4379df4a6e825632eafa0aeec87f0487ff86"' : 'data-target="#xs-controllers-links-module-OrdersModule-10ed16faaa0c110e00646a59cd4698c57e142787ff97663f067e01c8d0c9b74b9e80bcdeb7bf0715d69f430801bf4379df4a6e825632eafa0aeec87f0487ff86"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrdersModule-10ed16faaa0c110e00646a59cd4698c57e142787ff97663f067e01c8d0c9b74b9e80bcdeb7bf0715d69f430801bf4379df4a6e825632eafa0aeec87f0487ff86"' :
                                            'id="xs-controllers-links-module-OrdersModule-10ed16faaa0c110e00646a59cd4698c57e142787ff97663f067e01c8d0c9b74b9e80bcdeb7bf0715d69f430801bf4379df4a6e825632eafa0aeec87f0487ff86"' }>
                                            <li class="link">
                                                <a href="controllers/OrdersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OrdersModule-10ed16faaa0c110e00646a59cd4698c57e142787ff97663f067e01c8d0c9b74b9e80bcdeb7bf0715d69f430801bf4379df4a6e825632eafa0aeec87f0487ff86"' : 'data-target="#xs-injectables-links-module-OrdersModule-10ed16faaa0c110e00646a59cd4698c57e142787ff97663f067e01c8d0c9b74b9e80bcdeb7bf0715d69f430801bf4379df4a6e825632eafa0aeec87f0487ff86"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrdersModule-10ed16faaa0c110e00646a59cd4698c57e142787ff97663f067e01c8d0c9b74b9e80bcdeb7bf0715d69f430801bf4379df4a6e825632eafa0aeec87f0487ff86"' :
                                        'id="xs-injectables-links-module-OrdersModule-10ed16faaa0c110e00646a59cd4698c57e142787ff97663f067e01c8d0c9b74b9e80bcdeb7bf0715d69f430801bf4379df4a6e825632eafa0aeec87f0487ff86"' }>
                                        <li class="link">
                                            <a href="injectables/OrdersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OwnerModule.html" data-type="entity-link" >OwnerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OwnerModule-120d9c39b1a71687aed3a57c8a8d0c4b8b8036312d5976e725192a1464f90352316e3857455712a1e9b3f455966577508f3d83dee8cd87512975c1f6294491f6"' : 'data-target="#xs-injectables-links-module-OwnerModule-120d9c39b1a71687aed3a57c8a8d0c4b8b8036312d5976e725192a1464f90352316e3857455712a1e9b3f455966577508f3d83dee8cd87512975c1f6294491f6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OwnerModule-120d9c39b1a71687aed3a57c8a8d0c4b8b8036312d5976e725192a1464f90352316e3857455712a1e9b3f455966577508f3d83dee8cd87512975c1f6294491f6"' :
                                        'id="xs-injectables-links-module-OwnerModule-120d9c39b1a71687aed3a57c8a8d0c4b8b8036312d5976e725192a1464f90352316e3857455712a1e9b3f455966577508f3d83dee8cd87512975c1f6294491f6"' }>
                                        <li class="link">
                                            <a href="injectables/AdminService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CurrencyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CurrencyService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OwnerJwtRefreshService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OwnerJwtRefreshService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OwnerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OwnerService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TasksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductModule.html" data-type="entity-link" >ProductModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProductModule-00b307d00a08f74c1634ab369707c2452cb4833dd03d8cc19c7380b401368c92ecdc960036e6515f0096b850a546571efd14ba9899f73b275fe151d125ca2781"' : 'data-target="#xs-controllers-links-module-ProductModule-00b307d00a08f74c1634ab369707c2452cb4833dd03d8cc19c7380b401368c92ecdc960036e6515f0096b850a546571efd14ba9899f73b275fe151d125ca2781"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductModule-00b307d00a08f74c1634ab369707c2452cb4833dd03d8cc19c7380b401368c92ecdc960036e6515f0096b850a546571efd14ba9899f73b275fe151d125ca2781"' :
                                            'id="xs-controllers-links-module-ProductModule-00b307d00a08f74c1634ab369707c2452cb4833dd03d8cc19c7380b401368c92ecdc960036e6515f0096b850a546571efd14ba9899f73b275fe151d125ca2781"' }>
                                            <li class="link">
                                                <a href="controllers/ProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProductModule-00b307d00a08f74c1634ab369707c2452cb4833dd03d8cc19c7380b401368c92ecdc960036e6515f0096b850a546571efd14ba9899f73b275fe151d125ca2781"' : 'data-target="#xs-injectables-links-module-ProductModule-00b307d00a08f74c1634ab369707c2452cb4833dd03d8cc19c7380b401368c92ecdc960036e6515f0096b850a546571efd14ba9899f73b275fe151d125ca2781"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductModule-00b307d00a08f74c1634ab369707c2452cb4833dd03d8cc19c7380b401368c92ecdc960036e6515f0096b850a546571efd14ba9899f73b275fe151d125ca2781"' :
                                        'id="xs-injectables-links-module-ProductModule-00b307d00a08f74c1634ab369707c2452cb4833dd03d8cc19c7380b401368c92ecdc960036e6515f0096b850a546571efd14ba9899f73b275fe151d125ca2781"' }>
                                        <li class="link">
                                            <a href="injectables/CategoriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ColoursService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ColoursService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReviewsModule.html" data-type="entity-link" >ReviewsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ReviewsModule-ea5877bcb3f361309e20885a3cadc898f451521aade16a5282e2cad8d8d15b33d3101b4a368c393f6a98da4ae57780bc1ac71fd4d71fde08d81936133d394061"' : 'data-target="#xs-controllers-links-module-ReviewsModule-ea5877bcb3f361309e20885a3cadc898f451521aade16a5282e2cad8d8d15b33d3101b4a368c393f6a98da4ae57780bc1ac71fd4d71fde08d81936133d394061"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReviewsModule-ea5877bcb3f361309e20885a3cadc898f451521aade16a5282e2cad8d8d15b33d3101b4a368c393f6a98da4ae57780bc1ac71fd4d71fde08d81936133d394061"' :
                                            'id="xs-controllers-links-module-ReviewsModule-ea5877bcb3f361309e20885a3cadc898f451521aade16a5282e2cad8d8d15b33d3101b4a368c393f6a98da4ae57780bc1ac71fd4d71fde08d81936133d394061"' }>
                                            <li class="link">
                                                <a href="controllers/ReviewsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ReviewsModule-ea5877bcb3f361309e20885a3cadc898f451521aade16a5282e2cad8d8d15b33d3101b4a368c393f6a98da4ae57780bc1ac71fd4d71fde08d81936133d394061"' : 'data-target="#xs-injectables-links-module-ReviewsModule-ea5877bcb3f361309e20885a3cadc898f451521aade16a5282e2cad8d8d15b33d3101b4a368c393f6a98da4ae57780bc1ac71fd4d71fde08d81936133d394061"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReviewsModule-ea5877bcb3f361309e20885a3cadc898f451521aade16a5282e2cad8d8d15b33d3101b4a368c393f6a98da4ae57780bc1ac71fd4d71fde08d81936133d394061"' :
                                        'id="xs-injectables-links-module-ReviewsModule-ea5877bcb3f361309e20885a3cadc898f451521aade16a5282e2cad8d8d15b33d3101b4a368c393f6a98da4ae57780bc1ac71fd4d71fde08d81936133d394061"' }>
                                        <li class="link">
                                            <a href="injectables/CategoriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ReviewsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-RolesModule-6d6109e85750d2d3fd7ebcf7de778566cf4d6755dd72dab841859186b406451ecd82d3cd824c932752bcf98d4c8cebfe4051add69ae87f8234813ede0111a7df"' : 'data-target="#xs-controllers-links-module-RolesModule-6d6109e85750d2d3fd7ebcf7de778566cf4d6755dd72dab841859186b406451ecd82d3cd824c932752bcf98d4c8cebfe4051add69ae87f8234813ede0111a7df"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RolesModule-6d6109e85750d2d3fd7ebcf7de778566cf4d6755dd72dab841859186b406451ecd82d3cd824c932752bcf98d4c8cebfe4051add69ae87f8234813ede0111a7df"' :
                                            'id="xs-controllers-links-module-RolesModule-6d6109e85750d2d3fd7ebcf7de778566cf4d6755dd72dab841859186b406451ecd82d3cd824c932752bcf98d4c8cebfe4051add69ae87f8234813ede0111a7df"' }>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RolesModule-6d6109e85750d2d3fd7ebcf7de778566cf4d6755dd72dab841859186b406451ecd82d3cd824c932752bcf98d4c8cebfe4051add69ae87f8234813ede0111a7df"' : 'data-target="#xs-injectables-links-module-RolesModule-6d6109e85750d2d3fd7ebcf7de778566cf4d6755dd72dab841859186b406451ecd82d3cd824c932752bcf98d4c8cebfe4051add69ae87f8234813ede0111a7df"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-6d6109e85750d2d3fd7ebcf7de778566cf4d6755dd72dab841859186b406451ecd82d3cd824c932752bcf98d4c8cebfe4051add69ae87f8234813ede0111a7df"' :
                                        'id="xs-injectables-links-module-RolesModule-6d6109e85750d2d3fd7ebcf7de778566cf4d6755dd72dab841859186b406451ecd82d3cd824c932752bcf98d4c8cebfe4051add69ae87f8234813ede0111a7df"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CurrencyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CurrencyService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TasksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserJwtRefreshTokenService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserJwtRefreshTokenService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TelegramModule.html" data-type="entity-link" >TelegramModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-133fa1b45fcb4e3265f5fec941afdfe45c1c22b8618c49905dcd96120038a25a6ede10436740c9f814b8b5cd63aa69c1e5fd7d0ac30eb433371641243a7bda9a"' : 'data-target="#xs-controllers-links-module-UsersModule-133fa1b45fcb4e3265f5fec941afdfe45c1c22b8618c49905dcd96120038a25a6ede10436740c9f814b8b5cd63aa69c1e5fd7d0ac30eb433371641243a7bda9a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-133fa1b45fcb4e3265f5fec941afdfe45c1c22b8618c49905dcd96120038a25a6ede10436740c9f814b8b5cd63aa69c1e5fd7d0ac30eb433371641243a7bda9a"' :
                                            'id="xs-controllers-links-module-UsersModule-133fa1b45fcb4e3265f5fec941afdfe45c1c22b8618c49905dcd96120038a25a6ede10436740c9f814b8b5cd63aa69c1e5fd7d0ac30eb433371641243a7bda9a"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-133fa1b45fcb4e3265f5fec941afdfe45c1c22b8618c49905dcd96120038a25a6ede10436740c9f814b8b5cd63aa69c1e5fd7d0ac30eb433371641243a7bda9a"' : 'data-target="#xs-injectables-links-module-UsersModule-133fa1b45fcb4e3265f5fec941afdfe45c1c22b8618c49905dcd96120038a25a6ede10436740c9f814b8b5cd63aa69c1e5fd7d0ac30eb433371641243a7bda9a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-133fa1b45fcb4e3265f5fec941afdfe45c1c22b8618c49905dcd96120038a25a6ede10436740c9f814b8b5cd63aa69c1e5fd7d0ac30eb433371641243a7bda9a"' :
                                        'id="xs-injectables-links-module-UsersModule-133fa1b45fcb4e3265f5fec941afdfe45c1c22b8618c49905dcd96120038a25a6ede10436740c9f814b8b5cd63aa69c1e5fd7d0ac30eb433371641243a7bda9a"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CurrencyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CurrencyService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TasksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserJwtRefreshTokenService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserJwtRefreshTokenService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AdminController.html" data-type="entity-link" >AdminController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CardController.html" data-type="entity-link" >CardController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CategoriesController.html" data-type="entity-link" >CategoriesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ColoursController.html" data-type="entity-link" >ColoursController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/OrdersController.html" data-type="entity-link" >OrdersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductController.html" data-type="entity-link" >ProductController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ReviewsController.html" data-type="entity-link" >ReviewsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RolesController.html" data-type="entity-link" >RolesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddRoleDto.html" data-type="entity-link" >AddRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Admin.html" data-type="entity-link" >Admin</a>
                            </li>
                            <li class="link">
                                <a href="classes/AdminRefreshToken.html" data-type="entity-link" >AdminRefreshToken</a>
                            </li>
                            <li class="link">
                                <a href="classes/AllExceptionsFilter.html" data-type="entity-link" >AllExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApiError.html" data-type="entity-link" >ApiError</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApiErrorExceptionFilter.html" data-type="entity-link" >ApiErrorExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApiException.html" data-type="entity-link" >ApiException</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApiExceptionFilter.html" data-type="entity-link" >ApiExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/BadRequestError.html" data-type="entity-link" >BadRequestError</a>
                            </li>
                            <li class="link">
                                <a href="classes/BanUserDto.html" data-type="entity-link" >BanUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BookmarksProducts.html" data-type="entity-link" >BookmarksProducts</a>
                            </li>
                            <li class="link">
                                <a href="classes/Cart.html" data-type="entity-link" >Cart</a>
                            </li>
                            <li class="link">
                                <a href="classes/CartProduct.html" data-type="entity-link" >CartProduct</a>
                            </li>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeDto.html" data-type="entity-link" >ChangeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Colour.html" data-type="entity-link" >Colour</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAccessTokenDto.html" data-type="entity-link" >CreateAccessTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAdminDto.html" data-type="entity-link" >CreateAdminDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAdminRefreshTokenDto.html" data-type="entity-link" >CreateAdminRefreshTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDto.html" data-type="entity-link" >CreateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateColourDto.html" data-type="entity-link" >CreateColourDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOwnerDto.html" data-type="entity-link" >CreateOwnerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOwnerRefreshTokenDto.html" data-type="entity-link" >CreateOwnerRefreshTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateReviewDto.html" data-type="entity-link" >CreateReviewDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserRefreshTokenDto.html" data-type="entity-link" >CreateUserRefreshTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Currencies.html" data-type="entity-link" >Currencies</a>
                            </li>
                            <li class="link">
                                <a href="classes/GarbageCollectingProcessor.html" data-type="entity-link" >GarbageCollectingProcessor</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/JwtRefreshTokenDeletedEvent.html" data-type="entity-link" >JwtRefreshTokenDeletedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MatchConstraint.html" data-type="entity-link" >MatchConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/Nested.html" data-type="entity-link" >Nested</a>
                            </li>
                            <li class="link">
                                <a href="classes/Nested-1.html" data-type="entity-link" >Nested</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotFoundError.html" data-type="entity-link" >NotFoundError</a>
                            </li>
                            <li class="link">
                                <a href="classes/Order.html" data-type="entity-link" >Order</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderProduct.html" data-type="entity-link" >OrderProduct</a>
                            </li>
                            <li class="link">
                                <a href="classes/Owner.html" data-type="entity-link" >Owner</a>
                            </li>
                            <li class="link">
                                <a href="classes/OwnerRefreshToken.html" data-type="entity-link" >OwnerRefreshToken</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParseFormDataJsonPipe.html" data-type="entity-link" >ParseFormDataJsonPipe</a>
                            </li>
                            <li class="link">
                                <a href="classes/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductCategories.html" data-type="entity-link" >ProductCategories</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductColours.html" data-type="entity-link" >ProductColours</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductReviews.html" data-type="entity-link" >ProductReviews</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryFilterDto.html" data-type="entity-link" >QueryFilterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestValidator.html" data-type="entity-link" >RequestValidator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetDto.html" data-type="entity-link" >ResetDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Review.html" data-type="entity-link" >Review</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignupDto.html" data-type="entity-link" >SignupDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategoryDto.html" data-type="entity-link" >UpdateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateColourDto.html" data-type="entity-link" >UpdateColourDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRefreshToken.html" data-type="entity-link" >UserRefreshToken</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRoles.html" data-type="entity-link" >UserRoles</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidationException.html" data-type="entity-link" >ValidationException</a>
                            </li>
                            <li class="link">
                                <a href="classes/WatchedProducts.html" data-type="entity-link" >WatchedProducts</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ActivateMiddleware.html" data-type="entity-link" >ActivateMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AdminJwtRefreshService.html" data-type="entity-link" >AdminJwtRefreshService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AdminService.html" data-type="entity-link" >AdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AdminUserMiddleware.html" data-type="entity-link" >AdminUserMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppClusterService.html" data-type="entity-link" >AppClusterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppListener.html" data-type="entity-link" >AppListener</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthMiddleware.html" data-type="entity-link" >AuthMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CardService.html" data-type="entity-link" >CardService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoriesService.html" data-type="entity-link" >CategoriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ColoursService.html" data-type="entity-link" >ColoursService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CorsMiddleware.html" data-type="entity-link" >CorsMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CurrencyService.html" data-type="entity-link" >CurrencyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesService.html" data-type="entity-link" >FilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GlobalInterceptor.html" data-type="entity-link" >GlobalInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InitializeEmailMiddleware.html" data-type="entity-link" >InitializeEmailMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InitializeUserMiddleware.html" data-type="entity-link" >InitializeUserMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocationMiddleware.html" data-type="entity-link" >LocationMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrdersService.html" data-type="entity-link" >OrdersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OwnerJwtRefreshService.html" data-type="entity-link" >OwnerJwtRefreshService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OwnerService.html" data-type="entity-link" >OwnerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ParseJsonPipe.html" data-type="entity-link" >ParseJsonPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductMiddleware.html" data-type="entity-link" >ProductMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService.html" data-type="entity-link" >ProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReviewsService.html" data-type="entity-link" >ReviewsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesService.html" data-type="entity-link" >RolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TasksService.html" data-type="entity-link" >TasksService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TelegramService.html" data-type="entity-link" >TelegramService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThrottlerBehindProxyGuard.html" data-type="entity-link" >ThrottlerBehindProxyGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserAdminMiddleware.html" data-type="entity-link" >UserAdminMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserJwtRefreshTokenService.html" data-type="entity-link" >UserJwtRefreshTokenService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserMiddleware.html" data-type="entity-link" >UserMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserMiddleware-1.html" data-type="entity-link" >UserMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidateDto.html" data-type="entity-link" >ValidateDto</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AddContentGuard.html" data-type="entity-link" >AddContentGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link" >AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthFerfershGuard.html" data-type="entity-link" >AuthFerfershGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/EditContentGuard.html" data-type="entity-link" >EditContentGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/EditWebsiteGuard.html" data-type="entity-link" >EditWebsiteGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/OwnerAdminGuard.html" data-type="entity-link" >OwnerAdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RefreshAuthGuard.html" data-type="entity-link" >RefreshAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/UserGuard.html" data-type="entity-link" >UserGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AdmincreationAttrbs.html" data-type="entity-link" >AdmincreationAttrbs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AdminInterface.html" data-type="entity-link" >AdminInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AdminRefreshTokenCreationAttrbs.html" data-type="entity-link" >AdminRefreshTokenCreationAttrbs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthUser.html" data-type="entity-link" >AuthUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CategoryCreationAtrb.html" data-type="entity-link" >CategoryCreationAtrb</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CodeDto.html" data-type="entity-link" >CodeDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColourCreationAtrb.html" data-type="entity-link" >ColourCreationAtrb</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/fileCreated.html" data-type="entity-link" >fileCreated</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InitializeUser.html" data-type="entity-link" >InitializeUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITelegramModuleAsyncOptions.html" data-type="entity-link" >ITelegramModuleAsyncOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITelegramOptions.html" data-type="entity-link" >ITelegramOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Msg.html" data-type="entity-link" >Msg</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OwnerCreationAttrbs.html" data-type="entity-link" >OwnerCreationAttrbs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OwnerRefreshTokenCreationAttrbs.html" data-type="entity-link" >OwnerRefreshTokenCreationAttrbs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Payload.html" data-type="entity-link" >Payload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductCreationAttrs.html" data-type="entity-link" >ProductCreationAttrs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestHeaders.html" data-type="entity-link" >RequestHeaders</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReturnedAdmin.html" data-type="entity-link" >ReturnedAdmin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReturnedCategory.html" data-type="entity-link" >ReturnedCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReturnedColour.html" data-type="entity-link" >ReturnedColour</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReturnedOwner.html" data-type="entity-link" >ReturnedOwner</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReturnedProduct.html" data-type="entity-link" >ReturnedProduct</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReturnedProducts.html" data-type="entity-link" >ReturnedProducts</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReturnedReview.html" data-type="entity-link" >ReturnedReview</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReturnedUser.html" data-type="entity-link" >ReturnedUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReviewCreationAtrb.html" data-type="entity-link" >ReviewCreationAtrb</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RolecreationAttrbs.html" data-type="entity-link" >RolecreationAttrbs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tokens.html" data-type="entity-link" >Tokens</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UsercreationAttrbs.html" data-type="entity-link" >UsercreationAttrbs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInterface.html" data-type="entity-link" >UserInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRefreshCreationAttrbs.html" data-type="entity-link" >UserRefreshCreationAttrbs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ValidateUser.html" data-type="entity-link" >ValidateUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
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
                                            'data-target="#controllers-links-module-AdminModule-c68592a1f37c878a4a452f66b1796d37a30f6d61128f8ffd1e4eae9088add98c9f39044c1245db57a7be50f99c5831c190df875a622e9d9f02ff6fc337315276"' : 'data-target="#xs-controllers-links-module-AdminModule-c68592a1f37c878a4a452f66b1796d37a30f6d61128f8ffd1e4eae9088add98c9f39044c1245db57a7be50f99c5831c190df875a622e9d9f02ff6fc337315276"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AdminModule-c68592a1f37c878a4a452f66b1796d37a30f6d61128f8ffd1e4eae9088add98c9f39044c1245db57a7be50f99c5831c190df875a622e9d9f02ff6fc337315276"' :
                                            'id="xs-controllers-links-module-AdminModule-c68592a1f37c878a4a452f66b1796d37a30f6d61128f8ffd1e4eae9088add98c9f39044c1245db57a7be50f99c5831c190df875a622e9d9f02ff6fc337315276"' }>
                                            <li class="link">
                                                <a href="controllers/AdminController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AdminModule-c68592a1f37c878a4a452f66b1796d37a30f6d61128f8ffd1e4eae9088add98c9f39044c1245db57a7be50f99c5831c190df875a622e9d9f02ff6fc337315276"' : 'data-target="#xs-injectables-links-module-AdminModule-c68592a1f37c878a4a452f66b1796d37a30f6d61128f8ffd1e4eae9088add98c9f39044c1245db57a7be50f99c5831c190df875a622e9d9f02ff6fc337315276"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdminModule-c68592a1f37c878a4a452f66b1796d37a30f6d61128f8ffd1e4eae9088add98c9f39044c1245db57a7be50f99c5831c190df875a622e9d9f02ff6fc337315276"' :
                                        'id="xs-injectables-links-module-AdminModule-c68592a1f37c878a4a452f66b1796d37a30f6d61128f8ffd1e4eae9088add98c9f39044c1245db57a7be50f99c5831c190df875a622e9d9f02ff6fc337315276"' }>
                                        <li class="link">
                                            <a href="injectables/AdminJwtRefreshService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminJwtRefreshService</a>
                                        </li>
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
                                            'data-target="#controllers-links-module-AppModule-bcca87dc4dcbc5a861e64218f3f5729810d0d98cbba5edac67e11cb9617530f9a23aad06bc739f35a538643f2f55b7d322e828557bbe18fbb50082813bc8370f"' : 'data-target="#xs-controllers-links-module-AppModule-bcca87dc4dcbc5a861e64218f3f5729810d0d98cbba5edac67e11cb9617530f9a23aad06bc739f35a538643f2f55b7d322e828557bbe18fbb50082813bc8370f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-bcca87dc4dcbc5a861e64218f3f5729810d0d98cbba5edac67e11cb9617530f9a23aad06bc739f35a538643f2f55b7d322e828557bbe18fbb50082813bc8370f"' :
                                            'id="xs-controllers-links-module-AppModule-bcca87dc4dcbc5a861e64218f3f5729810d0d98cbba5edac67e11cb9617530f9a23aad06bc739f35a538643f2f55b7d322e828557bbe18fbb50082813bc8370f"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-bcca87dc4dcbc5a861e64218f3f5729810d0d98cbba5edac67e11cb9617530f9a23aad06bc739f35a538643f2f55b7d322e828557bbe18fbb50082813bc8370f"' : 'data-target="#xs-injectables-links-module-AppModule-bcca87dc4dcbc5a861e64218f3f5729810d0d98cbba5edac67e11cb9617530f9a23aad06bc739f35a538643f2f55b7d322e828557bbe18fbb50082813bc8370f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-bcca87dc4dcbc5a861e64218f3f5729810d0d98cbba5edac67e11cb9617530f9a23aad06bc739f35a538643f2f55b7d322e828557bbe18fbb50082813bc8370f"' :
                                        'id="xs-injectables-links-module-AppModule-bcca87dc4dcbc5a861e64218f3f5729810d0d98cbba5edac67e11cb9617530f9a23aad06bc739f35a538643f2f55b7d322e828557bbe18fbb50082813bc8370f"' }>
                                        <li class="link">
                                            <a href="injectables/AppClusterService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppClusterService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-6efe46cacba9325be4e70c3df25552c95991b2b9daec42726551d58e1cdf5525c5a36a48464a49830964653c6cdb5ee5e68c554b833243996ccb9e9a62b26d17"' : 'data-target="#xs-controllers-links-module-AuthModule-6efe46cacba9325be4e70c3df25552c95991b2b9daec42726551d58e1cdf5525c5a36a48464a49830964653c6cdb5ee5e68c554b833243996ccb9e9a62b26d17"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-6efe46cacba9325be4e70c3df25552c95991b2b9daec42726551d58e1cdf5525c5a36a48464a49830964653c6cdb5ee5e68c554b833243996ccb9e9a62b26d17"' :
                                            'id="xs-controllers-links-module-AuthModule-6efe46cacba9325be4e70c3df25552c95991b2b9daec42726551d58e1cdf5525c5a36a48464a49830964653c6cdb5ee5e68c554b833243996ccb9e9a62b26d17"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-6efe46cacba9325be4e70c3df25552c95991b2b9daec42726551d58e1cdf5525c5a36a48464a49830964653c6cdb5ee5e68c554b833243996ccb9e9a62b26d17"' : 'data-target="#xs-injectables-links-module-AuthModule-6efe46cacba9325be4e70c3df25552c95991b2b9daec42726551d58e1cdf5525c5a36a48464a49830964653c6cdb5ee5e68c554b833243996ccb9e9a62b26d17"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-6efe46cacba9325be4e70c3df25552c95991b2b9daec42726551d58e1cdf5525c5a36a48464a49830964653c6cdb5ee5e68c554b833243996ccb9e9a62b26d17"' :
                                        'id="xs-injectables-links-module-AuthModule-6efe46cacba9325be4e70c3df25552c95991b2b9daec42726551d58e1cdf5525c5a36a48464a49830964653c6cdb5ee5e68c554b833243996ccb9e9a62b26d17"' }>
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
                                            'data-target="#controllers-links-module-CartModule-9749100034b14b9213457274c844db4618db59c783d19bd0a671a1dbdc2a7b4ab8d893e7ee5153b7bbc569b7cc2ad272fc620cf053d7bc5f2a8b54a47b8f31a1"' : 'data-target="#xs-controllers-links-module-CartModule-9749100034b14b9213457274c844db4618db59c783d19bd0a671a1dbdc2a7b4ab8d893e7ee5153b7bbc569b7cc2ad272fc620cf053d7bc5f2a8b54a47b8f31a1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CartModule-9749100034b14b9213457274c844db4618db59c783d19bd0a671a1dbdc2a7b4ab8d893e7ee5153b7bbc569b7cc2ad272fc620cf053d7bc5f2a8b54a47b8f31a1"' :
                                            'id="xs-controllers-links-module-CartModule-9749100034b14b9213457274c844db4618db59c783d19bd0a671a1dbdc2a7b4ab8d893e7ee5153b7bbc569b7cc2ad272fc620cf053d7bc5f2a8b54a47b8f31a1"' }>
                                            <li class="link">
                                                <a href="controllers/CardController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CartModule-9749100034b14b9213457274c844db4618db59c783d19bd0a671a1dbdc2a7b4ab8d893e7ee5153b7bbc569b7cc2ad272fc620cf053d7bc5f2a8b54a47b8f31a1"' : 'data-target="#xs-injectables-links-module-CartModule-9749100034b14b9213457274c844db4618db59c783d19bd0a671a1dbdc2a7b4ab8d893e7ee5153b7bbc569b7cc2ad272fc620cf053d7bc5f2a8b54a47b8f31a1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CartModule-9749100034b14b9213457274c844db4618db59c783d19bd0a671a1dbdc2a7b4ab8d893e7ee5153b7bbc569b7cc2ad272fc620cf053d7bc5f2a8b54a47b8f31a1"' :
                                        'id="xs-injectables-links-module-CartModule-9749100034b14b9213457274c844db4618db59c783d19bd0a671a1dbdc2a7b4ab8d893e7ee5153b7bbc569b7cc2ad272fc620cf053d7bc5f2a8b54a47b8f31a1"' }>
                                        <li class="link">
                                            <a href="injectables/CardService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesModule.html" data-type="entity-link" >CategoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CategoriesModule-f2c8190ccc91a9b86aa98ff5b8a0dc107f35b56551ce972ca87b1d4080b815195f56aa79f8a6ac02ab8893bf4f0b2ddd105f91e135588b2ed90aefe38fb96826"' : 'data-target="#xs-controllers-links-module-CategoriesModule-f2c8190ccc91a9b86aa98ff5b8a0dc107f35b56551ce972ca87b1d4080b815195f56aa79f8a6ac02ab8893bf4f0b2ddd105f91e135588b2ed90aefe38fb96826"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoriesModule-f2c8190ccc91a9b86aa98ff5b8a0dc107f35b56551ce972ca87b1d4080b815195f56aa79f8a6ac02ab8893bf4f0b2ddd105f91e135588b2ed90aefe38fb96826"' :
                                            'id="xs-controllers-links-module-CategoriesModule-f2c8190ccc91a9b86aa98ff5b8a0dc107f35b56551ce972ca87b1d4080b815195f56aa79f8a6ac02ab8893bf4f0b2ddd105f91e135588b2ed90aefe38fb96826"' }>
                                            <li class="link">
                                                <a href="controllers/CategoriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CategoriesModule-f2c8190ccc91a9b86aa98ff5b8a0dc107f35b56551ce972ca87b1d4080b815195f56aa79f8a6ac02ab8893bf4f0b2ddd105f91e135588b2ed90aefe38fb96826"' : 'data-target="#xs-injectables-links-module-CategoriesModule-f2c8190ccc91a9b86aa98ff5b8a0dc107f35b56551ce972ca87b1d4080b815195f56aa79f8a6ac02ab8893bf4f0b2ddd105f91e135588b2ed90aefe38fb96826"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoriesModule-f2c8190ccc91a9b86aa98ff5b8a0dc107f35b56551ce972ca87b1d4080b815195f56aa79f8a6ac02ab8893bf4f0b2ddd105f91e135588b2ed90aefe38fb96826"' :
                                        'id="xs-injectables-links-module-CategoriesModule-f2c8190ccc91a9b86aa98ff5b8a0dc107f35b56551ce972ca87b1d4080b815195f56aa79f8a6ac02ab8893bf4f0b2ddd105f91e135588b2ed90aefe38fb96826"' }>
                                        <li class="link">
                                            <a href="injectables/CategoriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CoreModule-a9ead5553494e406334712b537335d0c1fa4b5e63234409792a78a1b4c165ce07b2a88cb7f6659b1614c67d1c2a2b6d36ca370f1fab5f363153da958824f5bd9"' : 'data-target="#xs-injectables-links-module-CoreModule-a9ead5553494e406334712b537335d0c1fa4b5e63234409792a78a1b4c165ce07b2a88cb7f6659b1614c67d1c2a2b6d36ca370f1fab5f363153da958824f5bd9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoreModule-a9ead5553494e406334712b537335d0c1fa4b5e63234409792a78a1b4c165ce07b2a88cb7f6659b1614c67d1c2a2b6d36ca370f1fab5f363153da958824f5bd9"' :
                                        'id="xs-injectables-links-module-CoreModule-a9ead5553494e406334712b537335d0c1fa4b5e63234409792a78a1b4c165ce07b2a88cb7f6659b1614c67d1c2a2b6d36ca370f1fab5f363153da958824f5bd9"' }>
                                        <li class="link">
                                            <a href="injectables/AppClusterService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppClusterService</a>
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
                                        'data-target="#injectables-links-module-MailModule-34b352a1af02d095b4db3ce5788a04caa5b93808a9765d15f63e1578f97acd6959f27cd4a161cb504215e08e04fd02ce29d62136d4e1a5084190291c09223723"' : 'data-target="#xs-injectables-links-module-MailModule-34b352a1af02d095b4db3ce5788a04caa5b93808a9765d15f63e1578f97acd6959f27cd4a161cb504215e08e04fd02ce29d62136d4e1a5084190291c09223723"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-34b352a1af02d095b4db3ce5788a04caa5b93808a9765d15f63e1578f97acd6959f27cd4a161cb504215e08e04fd02ce29d62136d4e1a5084190291c09223723"' :
                                        'id="xs-injectables-links-module-MailModule-34b352a1af02d095b4db3ce5788a04caa5b93808a9765d15f63e1578f97acd6959f27cd4a161cb504215e08e04fd02ce29d62136d4e1a5084190291c09223723"' }>
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
                                            'data-target="#controllers-links-module-OrdersModule-6ea07140dfe049fd98da9fea42d3c1392d7604bf42424ac65e79858dc2fa695a2364a4c1c4f6366d6afd1f389b0b66f7fc076f04df748cfcae8948da7234fe58"' : 'data-target="#xs-controllers-links-module-OrdersModule-6ea07140dfe049fd98da9fea42d3c1392d7604bf42424ac65e79858dc2fa695a2364a4c1c4f6366d6afd1f389b0b66f7fc076f04df748cfcae8948da7234fe58"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrdersModule-6ea07140dfe049fd98da9fea42d3c1392d7604bf42424ac65e79858dc2fa695a2364a4c1c4f6366d6afd1f389b0b66f7fc076f04df748cfcae8948da7234fe58"' :
                                            'id="xs-controllers-links-module-OrdersModule-6ea07140dfe049fd98da9fea42d3c1392d7604bf42424ac65e79858dc2fa695a2364a4c1c4f6366d6afd1f389b0b66f7fc076f04df748cfcae8948da7234fe58"' }>
                                            <li class="link">
                                                <a href="controllers/OrdersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OrdersModule-6ea07140dfe049fd98da9fea42d3c1392d7604bf42424ac65e79858dc2fa695a2364a4c1c4f6366d6afd1f389b0b66f7fc076f04df748cfcae8948da7234fe58"' : 'data-target="#xs-injectables-links-module-OrdersModule-6ea07140dfe049fd98da9fea42d3c1392d7604bf42424ac65e79858dc2fa695a2364a4c1c4f6366d6afd1f389b0b66f7fc076f04df748cfcae8948da7234fe58"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrdersModule-6ea07140dfe049fd98da9fea42d3c1392d7604bf42424ac65e79858dc2fa695a2364a4c1c4f6366d6afd1f389b0b66f7fc076f04df748cfcae8948da7234fe58"' :
                                        'id="xs-injectables-links-module-OrdersModule-6ea07140dfe049fd98da9fea42d3c1392d7604bf42424ac65e79858dc2fa695a2364a4c1c4f6366d6afd1f389b0b66f7fc076f04df748cfcae8948da7234fe58"' }>
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
                                        'data-target="#injectables-links-module-OwnerModule-6810e82e5497c8653cbcd445db8fbe4885071311ac7fb8aacf69aae5535f22512d09d4dfbc9f181be4fc0d37436ac3f99438525ff193ffb0d93956566aeeba3b"' : 'data-target="#xs-injectables-links-module-OwnerModule-6810e82e5497c8653cbcd445db8fbe4885071311ac7fb8aacf69aae5535f22512d09d4dfbc9f181be4fc0d37436ac3f99438525ff193ffb0d93956566aeeba3b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OwnerModule-6810e82e5497c8653cbcd445db8fbe4885071311ac7fb8aacf69aae5535f22512d09d4dfbc9f181be4fc0d37436ac3f99438525ff193ffb0d93956566aeeba3b"' :
                                        'id="xs-injectables-links-module-OwnerModule-6810e82e5497c8653cbcd445db8fbe4885071311ac7fb8aacf69aae5535f22512d09d4dfbc9f181be4fc0d37436ac3f99438525ff193ffb0d93956566aeeba3b"' }>
                                        <li class="link">
                                            <a href="injectables/AdminService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminService</a>
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
                                            'data-target="#controllers-links-module-ProductModule-8a6cd3a9cc69044c1a4c46f9e7f73f9b5cffbe98252badb3f85aa8c5e68b9048f24109b8b5751ba224a2e0be3a0d8207814f9759cf9d88001518bec378b92e83"' : 'data-target="#xs-controllers-links-module-ProductModule-8a6cd3a9cc69044c1a4c46f9e7f73f9b5cffbe98252badb3f85aa8c5e68b9048f24109b8b5751ba224a2e0be3a0d8207814f9759cf9d88001518bec378b92e83"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductModule-8a6cd3a9cc69044c1a4c46f9e7f73f9b5cffbe98252badb3f85aa8c5e68b9048f24109b8b5751ba224a2e0be3a0d8207814f9759cf9d88001518bec378b92e83"' :
                                            'id="xs-controllers-links-module-ProductModule-8a6cd3a9cc69044c1a4c46f9e7f73f9b5cffbe98252badb3f85aa8c5e68b9048f24109b8b5751ba224a2e0be3a0d8207814f9759cf9d88001518bec378b92e83"' }>
                                            <li class="link">
                                                <a href="controllers/ProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProductModule-8a6cd3a9cc69044c1a4c46f9e7f73f9b5cffbe98252badb3f85aa8c5e68b9048f24109b8b5751ba224a2e0be3a0d8207814f9759cf9d88001518bec378b92e83"' : 'data-target="#xs-injectables-links-module-ProductModule-8a6cd3a9cc69044c1a4c46f9e7f73f9b5cffbe98252badb3f85aa8c5e68b9048f24109b8b5751ba224a2e0be3a0d8207814f9759cf9d88001518bec378b92e83"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductModule-8a6cd3a9cc69044c1a4c46f9e7f73f9b5cffbe98252badb3f85aa8c5e68b9048f24109b8b5751ba224a2e0be3a0d8207814f9759cf9d88001518bec378b92e83"' :
                                        'id="xs-injectables-links-module-ProductModule-8a6cd3a9cc69044c1a4c46f9e7f73f9b5cffbe98252badb3f85aa8c5e68b9048f24109b8b5751ba224a2e0be3a0d8207814f9759cf9d88001518bec378b92e83"' }>
                                        <li class="link">
                                            <a href="injectables/CategoriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesService</a>
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
                                            'data-target="#controllers-links-module-ReviewsModule-0c00934434d727c505dc857d6ab4dd6387654c229f918bbcf677e8d950a9029faa9a2843c08b587fe8d70faf7df6347cb00c2952fe1a61e541d92c75a7da8f21"' : 'data-target="#xs-controllers-links-module-ReviewsModule-0c00934434d727c505dc857d6ab4dd6387654c229f918bbcf677e8d950a9029faa9a2843c08b587fe8d70faf7df6347cb00c2952fe1a61e541d92c75a7da8f21"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReviewsModule-0c00934434d727c505dc857d6ab4dd6387654c229f918bbcf677e8d950a9029faa9a2843c08b587fe8d70faf7df6347cb00c2952fe1a61e541d92c75a7da8f21"' :
                                            'id="xs-controllers-links-module-ReviewsModule-0c00934434d727c505dc857d6ab4dd6387654c229f918bbcf677e8d950a9029faa9a2843c08b587fe8d70faf7df6347cb00c2952fe1a61e541d92c75a7da8f21"' }>
                                            <li class="link">
                                                <a href="controllers/ReviewsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ReviewsModule-0c00934434d727c505dc857d6ab4dd6387654c229f918bbcf677e8d950a9029faa9a2843c08b587fe8d70faf7df6347cb00c2952fe1a61e541d92c75a7da8f21"' : 'data-target="#xs-injectables-links-module-ReviewsModule-0c00934434d727c505dc857d6ab4dd6387654c229f918bbcf677e8d950a9029faa9a2843c08b587fe8d70faf7df6347cb00c2952fe1a61e541d92c75a7da8f21"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReviewsModule-0c00934434d727c505dc857d6ab4dd6387654c229f918bbcf677e8d950a9029faa9a2843c08b587fe8d70faf7df6347cb00c2952fe1a61e541d92c75a7da8f21"' :
                                        'id="xs-injectables-links-module-ReviewsModule-0c00934434d727c505dc857d6ab4dd6387654c229f918bbcf677e8d950a9029faa9a2843c08b587fe8d70faf7df6347cb00c2952fe1a61e541d92c75a7da8f21"' }>
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
                                            'data-target="#controllers-links-module-RolesModule-9c6bb4f93206cffd790463defc5cb54755e3590ea59a5f1f4faa00ed330f88e0fe25da91dbe41e054cbf31410311d4276e8b8c5e59bcf50b505390da3284d759"' : 'data-target="#xs-controllers-links-module-RolesModule-9c6bb4f93206cffd790463defc5cb54755e3590ea59a5f1f4faa00ed330f88e0fe25da91dbe41e054cbf31410311d4276e8b8c5e59bcf50b505390da3284d759"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RolesModule-9c6bb4f93206cffd790463defc5cb54755e3590ea59a5f1f4faa00ed330f88e0fe25da91dbe41e054cbf31410311d4276e8b8c5e59bcf50b505390da3284d759"' :
                                            'id="xs-controllers-links-module-RolesModule-9c6bb4f93206cffd790463defc5cb54755e3590ea59a5f1f4faa00ed330f88e0fe25da91dbe41e054cbf31410311d4276e8b8c5e59bcf50b505390da3284d759"' }>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RolesModule-9c6bb4f93206cffd790463defc5cb54755e3590ea59a5f1f4faa00ed330f88e0fe25da91dbe41e054cbf31410311d4276e8b8c5e59bcf50b505390da3284d759"' : 'data-target="#xs-injectables-links-module-RolesModule-9c6bb4f93206cffd790463defc5cb54755e3590ea59a5f1f4faa00ed330f88e0fe25da91dbe41e054cbf31410311d4276e8b8c5e59bcf50b505390da3284d759"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-9c6bb4f93206cffd790463defc5cb54755e3590ea59a5f1f4faa00ed330f88e0fe25da91dbe41e054cbf31410311d4276e8b8c5e59bcf50b505390da3284d759"' :
                                        'id="xs-injectables-links-module-RolesModule-9c6bb4f93206cffd790463defc5cb54755e3590ea59a5f1f4faa00ed330f88e0fe25da91dbe41e054cbf31410311d4276e8b8c5e59bcf50b505390da3284d759"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
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
                                            'data-target="#controllers-links-module-UsersModule-475173f92b584297740825f11581fe7fe5e55d581cec7b8a03af134172aef6faa98e23006c2490a00c33fab00ae4edb49bd2ec401f2a39699fb0685b38af3969"' : 'data-target="#xs-controllers-links-module-UsersModule-475173f92b584297740825f11581fe7fe5e55d581cec7b8a03af134172aef6faa98e23006c2490a00c33fab00ae4edb49bd2ec401f2a39699fb0685b38af3969"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-475173f92b584297740825f11581fe7fe5e55d581cec7b8a03af134172aef6faa98e23006c2490a00c33fab00ae4edb49bd2ec401f2a39699fb0685b38af3969"' :
                                            'id="xs-controllers-links-module-UsersModule-475173f92b584297740825f11581fe7fe5e55d581cec7b8a03af134172aef6faa98e23006c2490a00c33fab00ae4edb49bd2ec401f2a39699fb0685b38af3969"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-475173f92b584297740825f11581fe7fe5e55d581cec7b8a03af134172aef6faa98e23006c2490a00c33fab00ae4edb49bd2ec401f2a39699fb0685b38af3969"' : 'data-target="#xs-injectables-links-module-UsersModule-475173f92b584297740825f11581fe7fe5e55d581cec7b8a03af134172aef6faa98e23006c2490a00c33fab00ae4edb49bd2ec401f2a39699fb0685b38af3969"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-475173f92b584297740825f11581fe7fe5e55d581cec7b8a03af134172aef6faa98e23006c2490a00c33fab00ae4edb49bd2ec401f2a39699fb0685b38af3969"' :
                                        'id="xs-injectables-links-module-UsersModule-475173f92b584297740825f11581fe7fe5e55d581cec7b8a03af134172aef6faa98e23006c2490a00c33fab00ae4edb49bd2ec401f2a39699fb0685b38af3969"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
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
                                <a href="classes/CartProduct-1.html" data-type="entity-link" >CartProduct</a>
                            </li>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeDto.html" data-type="entity-link" >ChangeDto</a>
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
                                <a href="classes/Product-1.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductCategories.html" data-type="entity-link" >ProductCategories</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductReviews.html" data-type="entity-link" >ProductReviews</a>
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
                                    <a href="injectables/CorsMiddleware.html" data-type="entity-link" >CorsMiddleware</a>
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
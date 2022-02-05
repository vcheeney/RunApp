/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AlbumController } from './controllers/albumController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EventController } from './controllers/eventController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OrganizationController } from './controllers/organizationController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PhotoController } from './controllers/photoController';
import { expressAuthentication } from './middleware/authentication';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Album": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"uri":{"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Le URI de l'album est requis"},"minLength":{"errorMsg":"Le URI de l'album doit avoir au moins 3 caractères","value":3},"maxLength":{"errorMsg":"Le URI de l'album doit avoir au plus 50 caractères","value":50}}},"name":{"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Le nom de l'album est requis"},"minLength":{"errorMsg":"Le nom de l'album doit avoir au moins 3 caractères","value":3},"maxLength":{"errorMsg":"Le nom de l'album doit avoir au plus 50 caractères","value":50}}},"photoCount":{"dataType":"double","required":true},"updatedDate":{"dataType":"datetime","required":true},"createdDate":{"dataType":"datetime","required":true},"eventId":{"dataType":"string","required":true},"organizationId":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_Album.name-or-uri_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Le nom de l'album est requis"},"minLength":{"errorMsg":"Le nom de l'album doit avoir au moins 3 caractères","value":3},"maxLength":{"errorMsg":"Le nom de l'album doit avoir au plus 50 caractères","value":50}}},"uri":{"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Le URI de l'album est requis"},"minLength":{"errorMsg":"Le URI de l'album doit avoir au moins 3 caractères","value":3},"maxLength":{"errorMsg":"Le URI de l'album doit avoir au plus 50 caractères","value":50}}}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateAlbumDto": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_Album.name-or-uri_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateAlbumDto": {
        "dataType": "refAlias",
        "type": {"ref":"CreateAlbumDto","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RacingEvent": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"image":{"dataType":"string","required":true},"eventDate":{"dataType":"date","required":true,"validators":{"isDate":{"errorMsg":"La date doit être une date valide"}}},"uri":{"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"L'URI de l'événement est requis"},"minLength":{"errorMsg":"L'URI de l'événement doit contenir au moins 3 caractères","value":3},"maxLength":{"errorMsg":"L'URI de l'événement doit contenir au plus 50 caractères","value":50}}},"name":{"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Le nom de l'événement est requis"},"minLength":{"errorMsg":"Le nom de l'événement doit contenir au moins 3 caractères","value":3},"maxLength":{"errorMsg":"Le nom de l'événement doit contenir au plus 50 caractères","value":50}}},"photoCount":{"dataType":"double","required":true},"updatedDate":{"dataType":"datetime","required":true},"createdDate":{"dataType":"datetime","required":true},"organisationId":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_RacingEvent.eventDate-or-name-or-image-or-uri_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Le nom de l'événement est requis"},"minLength":{"errorMsg":"Le nom de l'événement doit contenir au moins 3 caractères","value":3},"maxLength":{"errorMsg":"Le nom de l'événement doit contenir au plus 50 caractères","value":50}}},"uri":{"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"L'URI de l'événement est requis"},"minLength":{"errorMsg":"L'URI de l'événement doit contenir au moins 3 caractères","value":3},"maxLength":{"errorMsg":"L'URI de l'événement doit contenir au plus 50 caractères","value":50}}},"eventDate":{"dataType":"date","required":true,"validators":{"isDate":{"errorMsg":"La date doit être une date valide"}}},"image":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateEventDto": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_RacingEvent.eventDate-or-name-or-image-or-uri_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateEventDto": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"image":{"dataType":"string","required":true},"eventDate":{"dataType":"datetime","required":true},"uri":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Organization": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"banner":{"dataType":"string","required":true},"logo":{"dataType":"string","required":true},"uri":{"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"L'URI de l'organisation est requis"},"minLength":{"errorMsg":"L'URI de l'organisation doit faire au moins 3 caractères","value":3},"maxLength":{"errorMsg":"L'URI de l'organisation doit faire au plus 50 caractères","value":50}}},"name":{"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Le nom de l'organisation est requis"},"minLength":{"errorMsg":"Le nom de l'organisation doit faire au moins 5 caractères","value":5},"maxLength":{"errorMsg":"Le nom de l'organisation doit faire au plus 50 caractères","value":50}}},"members":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"permissions":{"dataType":"array","array":{"dataType":"string"},"required":true},"name":{"dataType":"string","required":true},"userId":{"dataType":"string","required":true}}},"required":true},"membersIds":{"dataType":"array","array":{"dataType":"string"},"required":true},"photoCount":{"dataType":"double","required":true},"updatedDate":{"dataType":"datetime","required":true},"createdDate":{"dataType":"datetime","required":true},"id":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_Organization.name-or-uri-or-logo-or-banner_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Le nom de l'organisation est requis"},"minLength":{"errorMsg":"Le nom de l'organisation doit faire au moins 5 caractères","value":5},"maxLength":{"errorMsg":"Le nom de l'organisation doit faire au plus 50 caractères","value":50}}},"uri":{"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"L'URI de l'organisation est requis"},"minLength":{"errorMsg":"L'URI de l'organisation doit faire au moins 3 caractères","value":3},"maxLength":{"errorMsg":"L'URI de l'organisation doit faire au plus 50 caractères","value":50}}},"logo":{"dataType":"string","required":true},"banner":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateOrganizationDto": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_Organization.name-or-uri-or-logo-or-banner_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateOrganizationDto": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"banner":{"dataType":"string","required":true},"logo":{"dataType":"string","required":true},"uri":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_Photo.Exclude_keyofPhoto.sourceImageUrl__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"id":{"dataType":"string","required":true},"organizationId":{"dataType":"string","required":true},"eventId":{"dataType":"string","required":true},"albumId":{"dataType":"string","required":true},"bibNumbers":{"dataType":"array","array":{"dataType":"string"},"required":true},"haveBibsBeenChecked":{"dataType":"boolean","required":true},"analysisDate":{"dataType":"datetime"},"previewImageUrl":{"dataType":"string","required":true},"price":{"dataType":"enum","enums":[0],"required":true},"width":{"dataType":"double","required":true},"height":{"dataType":"double","required":true},"portrait":{"dataType":"boolean","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_Photo.sourceImageUrl_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_Photo.Exclude_keyofPhoto.sourceImageUrl__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WebPhoto": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_Photo.sourceImageUrl_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Photo": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"portrait":{"dataType":"boolean","required":true},"height":{"dataType":"double","required":true},"width":{"dataType":"double","required":true},"price":{"dataType":"enum","enums":[0],"required":true},"previewImageUrl":{"dataType":"string","required":true},"sourceImageUrl":{"dataType":"string","required":true},"analysisDate":{"dataType":"datetime"},"haveBibsBeenChecked":{"dataType":"boolean","required":true},"bibNumbers":{"dataType":"array","array":{"dataType":"string"},"required":true},"albumId":{"dataType":"string","required":true},"eventId":{"dataType":"string","required":true},"organizationId":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/albums',
            authenticateMiddleware([{"firebase":[]}]),

            function AlbumController_create(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    orgUri: {"in":"query","name":"orgUri","required":true,"dataType":"string"},
                    eventUri: {"in":"query","name":"eventUri","required":true,"dataType":"string"},
                    createAlbumDto: {"in":"body","name":"createAlbumDto","required":true,"ref":"CreateAlbumDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AlbumController();


              const promise = controller.create.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/albums',
            authenticateMiddleware([{"firebase":[]}]),

            function AlbumController_modify(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    orgUri: {"in":"query","name":"orgUri","required":true,"dataType":"string"},
                    eventUri: {"in":"query","name":"eventUri","required":true,"dataType":"string"},
                    albumUri: {"in":"query","name":"albumUri","required":true,"dataType":"string"},
                    updateAlbumDto: {"in":"body","name":"updateAlbumDto","required":true,"ref":"UpdateAlbumDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AlbumController();


              const promise = controller.modify.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/albums',

            function AlbumController_findEventAlbums(request: any, response: any, next: any) {
            const args = {
                    orgUri: {"in":"query","name":"orgUri","required":true,"dataType":"string"},
                    eventUri: {"in":"query","name":"eventUri","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AlbumController();


              const promise = controller.findEventAlbums.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/albums/:albumUri',

            function AlbumController_findByUri(request: any, response: any, next: any) {
            const args = {
                    orgUri: {"in":"query","name":"orgUri","required":true,"dataType":"string"},
                    eventUri: {"in":"query","name":"eventUri","required":true,"dataType":"string"},
                    albumUri: {"in":"path","name":"albumUri","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AlbumController();


              const promise = controller.findByUri.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/events',
            authenticateMiddleware([{"firebase":[]}]),

            function EventController_create(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    orgUri: {"in":"query","name":"orgUri","required":true,"dataType":"string"},
                    createEventDto: {"in":"body","name":"createEventDto","required":true,"ref":"CreateEventDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new EventController();


              const promise = controller.create.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/events',
            authenticateMiddleware([{"firebase":[]}]),

            function EventController_update(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    orgUri: {"in":"query","name":"orgUri","required":true,"dataType":"string"},
                    updateEventDto: {"in":"body","name":"updateEventDto","required":true,"ref":"UpdateEventDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new EventController();


              const promise = controller.update.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/events',

            function EventController_findOrganizationEvents(request: any, response: any, next: any) {
            const args = {
                    orgUri: {"in":"query","name":"orgUri","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new EventController();


              const promise = controller.findOrganizationEvents.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/events/:eventUri',

            function EventController_findByUri(request: any, response: any, next: any) {
            const args = {
                    orgUri: {"in":"query","name":"orgUri","required":true,"dataType":"string"},
                    eventUri: {"in":"path","name":"eventUri","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new EventController();


              const promise = controller.findByUri.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/organizations',
            authenticateMiddleware([{"firebase":[]}]),

            function OrganizationController_create(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    createOrganizationDto: {"in":"body","name":"createOrganizationDto","required":true,"ref":"CreateOrganizationDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrganizationController();


              const promise = controller.create.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/organizations',
            authenticateMiddleware([{"firebase":[]}]),

            function OrganizationController_update(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    orgUri: {"in":"query","name":"orgUri","required":true,"dataType":"string"},
                    updateOrganizationDto: {"in":"body","name":"updateOrganizationDto","required":true,"ref":"UpdateOrganizationDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrganizationController();


              const promise = controller.update.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/organizations',
            authenticateMiddleware([{"firebase":[]}]),

            function OrganizationController_findAllForUser(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    userId: {"in":"query","name":"userId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrganizationController();


              const promise = controller.findAllForUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/organizations/:orgUri',

            function OrganizationController_findByUri(request: any, response: any, next: any) {
            const args = {
                    orgUri: {"in":"path","name":"orgUri","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new OrganizationController();


              const promise = controller.findByUri.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/photos',

            function PhotoController_findMany(request: any, response: any, next: any) {
            const args = {
                    eventId: {"in":"query","name":"eventId","required":true,"dataType":"string"},
                    albumsIdsString: {"in":"query","name":"albumsIdsString","dataType":"string"},
                    lastPagePhotoId: {"in":"query","name":"lastPagePhotoId","dataType":"string"},
                    bibNumber: {"in":"query","name":"bibNumber","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PhotoController();


              const promise = controller.findMany.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/photos/:photoId',

            function PhotoController_findById(request: any, response: any, next: any) {
            const args = {
                    photoId: {"in":"path","name":"photoId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PhotoController();


              const promise = controller.findById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/photos/:photoId',
            authenticateMiddleware([{"firebase":[]}]),

            function PhotoController_delete(request: any, response: any, next: any) {
            const args = {
                    photoId: {"in":"path","name":"photoId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PhotoController();


              const promise = controller.delete.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, _response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await promiseAny(secMethodOrPromises);
                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

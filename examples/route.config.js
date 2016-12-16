import navConfig from './nav.config.json';


const registerRoute = (config) => {
    let route = [{
        path: '/',
        component: require('./pages/home.vue'),
        children: []
    }];

    function addRoute(page) {
        const component = require('./pages' + page.path + '.vue');
        let child = {
            path: page.path.slice(1),
            meta: {
                title: page.title || page.name,
                description: page.description
            },
            component: component.default || component
        };

        route[0].children.push(child);
    }
    config
        .map(nav => {
            if (nav && nav.path) {
                addRoute(nav);
            } 
            if (nav.groups) {
                nav.groups.map(group => {
                    group.list.map(page => {
                        addRoute(page);
                    });
                });
            } else if (nav.children) {
                nav.children.map(page => {
                    addRoute(page);
                });
            }
        });

    return { route, navs: config };
};

const route = registerRoute(navConfig);


route.route.push({
    path: '*',
    redirect: '/',
    component: require('./pages/home.vue')
});

export const navs = route.navs;
export default route.route;

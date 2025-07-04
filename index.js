const Proxy = require('./support/proxy')


try {
    const proxy = new Proxy({
        host: '127.0.0.1',
        port: 19132,
        username: '',
        profilesFolder: './profiles/',
        destination: { realms: { realmInvite: '' } },
        onMsaCode: code => console.log("Sign in to join:\n" + code.message)
    })
} catch (error) {
    console.error(error)
}
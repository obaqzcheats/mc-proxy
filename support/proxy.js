const { Relay } = require('bedrock-protocol')
const fs = require('fs')
const path = require('path')

class Proxy {
  constructor(config) {
    this.relay = new Relay({
      host: config.host,
      port: config.port,
      username: config.username,
      profilesFolder: config.profilesFolder,
      destination: config.destination,
      onMsaCode: config.onMsaCode
    })

    this.cmdmap = new Map()
    this.usersbeds = []

    this.toggled = false

    this.entityid = null

    this.loadcmds()
    this.relay.listen()
    this.handler()
  }

  loadcmds() {
    for (const file of fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'))) {
      const cmd = require(`../commands/${file}`)
      this.cmdmap.set(cmd.name, cmd)
    }
  }

  handler() {
    this.relay.on('connect', player => {
      console.log('user connected', player.connection.address)

      player.on('close', () => console.log('user disconnected', player.connection.address))

      player.on('clientbound', (packet) => {
        const { name, params } = packet

        if (name === 'start_game') {
          this.entityid = params.entity_id

          player.queue('toast_request', {
            title: '',
            message: '§cdiscord.gg/§fcrashing §c| §fcrashing §cv2 on top'
          })
        }

        if (name === 'add_player') {
          const { username, unique_id, metadata } = params
          const bedMeta = metadata?.find(m => m.key === 'player_bed_position' && m.value)
          if (bedMeta) {
            const { x, y, z } = bedMeta.value
            this.usersbeds.push({ username, unique: unique_id, bedPos: `x ${x} y ${y} z ${z}` })
          }
        }
      })

      player.on('serverbound', ({ name, params }, des) => {
        if (name !== 'text') return

        const msg = params.message
        if (!msg.startsWith('.')) return

        const args = msg.slice(1).split(' ')
        const cmdName = args.shift().toLowerCase()

        const respond = message => player.queue('text', {
          type: 'chat', needs_translation: false, source_name: '',
          message, xuid: '', platform_chat_id: '', filtered_message: ''
        })

        const command = this.cmdmap.get(cmdName)
        if (command) {
          des.data = {}
          command.execute(player, args, respond, this)
        }
      })
    })
  }
}

module.exports = Proxy

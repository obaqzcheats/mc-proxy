module.exports = {
    name: "bed",
    execute(player, args, respond, proxy) {
        if(!args.length) return respond('§cUsage: .bed <all/user>')
      
      if (args[0] === 'all') {
        console.log(proxy.usersbeds)
        if(!proxy.usersbeds.length) return respond('§cno users found in bed list')
        return respond('§abed locations - \n' + proxy.usersbeds.map(user => `§7${user.username}: §e${user.bedPos}`).join('\n'))
      }
      
      if (args[0] === 'user') {
        const user = proxy.usersbeds.find(user => user.username === args[1])
        if (!user) return respond('§cuser not found')
        return respond(`§abed location for ${user.username}: §e${user.bedPos}`)
      }
      
    }
  }
  
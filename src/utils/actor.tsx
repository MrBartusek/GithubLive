import { Endpoints } from '@octokit/types'

type ActorType = Endpoints["GET /events"]["response"]["data"][0]["actor"]

export function isActorBot(actor: ActorType): boolean {
    return actor.login.endsWith('[bot]')
  }

export function  actorURL(actor: ActorType): string {
    if(isActorBot(actor)) {
        return `https://github.com/apps/${actor.login.substr(0, actor.login.length - 5)}`
    }
    return `https://github.com/${actor.login}`
}
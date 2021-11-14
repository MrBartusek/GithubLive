import { Endpoints } from "@octokit/types"
import { GoComment, GoEye, GoGitBranch, GoGitMerge, GoGitPullRequest, GoIssueClosed, GoIssueOpened, GoIssueReopened, GoListUnordered, GoPerson, GoQuestion, GoRepo, GoRepoForked, GoRepoPush, GoStar, GoTag, GoTrashcan } from "react-icons/go"
import { actorURL } from "./actor"
import EventType from "./eventType";
import { IconType } from "react-icons";

type EndpointEventType = Endpoints["GET /events"]["response"]["data"][0];

enum EventColors {
    SUCCESS = "#27ae60",
    DANGER = "#c0392b",
    COMMENT = "#2c3e50",
    STAR = "#f1c40f",
    EDIT = "#f39c12",
    MERGE = "#9b59b6",
    INFO = "#2980b9",
    MISC = "#95a5a6"
}


export interface IEventInfo {
    header: JSX.Element,
    icon: IconType,
    color: string,
    type: EventType,
    event: EndpointEventType
}

export function eventInfo(event: EndpointEventType) : IEventInfo | null {
    const result = {
        event: event
    }
    const actor = actorElement(event)
    const repo = repoElement(event)
    const commonRef = <span><code>{(event.payload as any).ref}</code> ({(event.payload as any).ref_type})</span>

    if(event.type === "CommitCommentEvent") {
        const commitId = (event.payload.comment as any).commit_id;
        const url = <a href={`https://github.com/${event.repo.name}/commit/${commitId}`}><code>{commitId.substr(0, 8)}</code></a>

        return {
            ...result,
            type: EventType.COMMIT_COMMENT,
            icon: GoComment,
            color: EventColors.COMMENT,
            header: <span>{actor} commented on {url} in {repo}</span>
        }
    }
    else if(event.type === "CreateEvent") {
        if((event.payload as any).ref_type === "tag") {
            return {
                ...result,
                type: EventType.CREATE_TAG,
                color: EventColors.SUCCESS,
                icon: GoTag,
                header: <span>{actor} created {commonRef} in {repo}</span>,
            }
        }
        else if((event.payload as any).ref_type === "branch") {
            return {
                ...result,
                type: EventType.CREATE_BRACH,
                color: EventColors.SUCCESS,
                icon: GoGitBranch,
                header: <span>{actor} created {commonRef} in {repo}</span>,
            }
        }
        else if((event.payload as any).ref_type === "repository") {
            return {
                ...result,
                type: EventType.CREATE_REPO,
                color: EventColors.SUCCESS,
                icon: GoRepo,
                header: <span>{actor} created new repository {repo}</span>,
            }
        }
    }
    else if(event.type === "DeleteEvent") {
        if((event.payload as any).ref_type === "tag") {
            return {
                ...result,
                type: EventType.DELETE_TAG,
                color: EventColors.DANGER,
                icon: GoTrashcan,
                header: <span>{actor} deleted {commonRef} in {repo}</span>,
            }
        }
        else if((event.payload as any).ref_type === "branch") {
            return {
                ...result,
                type: EventType.DELETE_BRACH,
                color: EventColors.DANGER,
                icon: GoTrashcan,
                header: <span>{actor} deleted {commonRef} in {repo}</span>,
            }
        }
        else if((event.payload as any).ref_type === "repository") {
            return {
                ...result,
                type: EventType.DELETE_REPO,
                color: EventColors.DANGER,
                icon: GoTrashcan,
                header: <span>{actor} deleted {repo}</span>,
            }
        }
    }
    else if(event.type === "ForkEvent") {
        return {
            ...result,
            type: EventType.FORK_REPO,
            color: EventColors.INFO,
            icon: GoRepoForked,
            header: <span>{actor} forked {repo}</span>,
        }
    }
    else if(event.type === "PushEvent") {
        const commits = (event.payload as any).commits
        if(commits.length === 0) return null
        const commitId = commits[0].sha
        const commit = <a href={`https://github.com/${event.repo.name}/commit/${commitId}`}><code>{commitId.substr(0, 8)}</code></a>
        return {
            ...result,
            type: EventType.PUSH,
            color: EventColors.MISC,
            icon: GoRepoPush,
            header: <span>{actor} pushed {commits > 0 ? commits.length + " commits" : commit} into {repo}</span>,
        }
    }
    else if(event.type === "WatchEvent") {
        if(event.payload.action === "started") {
            return {
                ...result,
                type: EventType.STAR_REPO,
                color: EventColors.STAR,
                icon: GoStar,
                header: <span>{actor} starred {repo}</span>,
            }
        }
    }
    else if(event.type === "IssueCommentEvent") {
        const issue = <a href={event.payload.issue?.html_url} className="font-weight-bold">#{event.payload.issue?.number}</a>
        if(event.payload.issue?.pull_request !== undefined) {
            if(event.payload.action === "created") {
                return {
                    ...result,
                    type: EventType.PR_COMMENT,
                    color: EventColors.COMMENT,
                    icon: GoComment,
                    header: <span>{actor} commented on pull request {issue} in {repo}</span>
                }
            }
            else if(event.payload.action === "deleted") {
                return {
                    ...result,
                    type: EventType.PR_COMMENT,
                    color: EventColors.DANGER,
                    icon: GoComment,
                    header: <span>{actor} deleted comment on pull request {issue} in {repo}</span>
                }
            }
            else if(event.payload.action === "edited") {
                return {
                    ...result,
                    type: EventType.PR_COMMENT,
                    color: EventColors.EDIT,
                    icon: GoComment,
                    header: <span>{actor} edited comment on pull request {issue} in {repo}</span>
                }
            }
        }
        else {
            if(event.payload.action === "created") {
                return {
                    ...result,
                    type: EventType.ISSUE_COMMENT,
                    color: EventColors.COMMENT,
                    icon: GoComment,
                    header: <span>{actor} commented on issue {issue} in {repo}</span>
                }
            }
            else if(event.payload.action === "deleted") {
                return {
                    ...result,
                    type: EventType.ISSUE_COMMENT,
                    color: EventColors.DANGER,
                    icon: GoComment,
                    header: <span>{actor} deleted comment on issue {issue} in {repo}</span>
                }
            }
            else if(event.payload.action === "edited") {
                return {
                    ...result,
                    type: EventType.ISSUE_COMMENT,
                    color: EventColors.EDIT,
                    icon: GoComment,
                    header: <span>{actor} edited comment on issue {issue} in {repo}</span>
                }
            }
        }
    }
    else if(event.type === "IssuesEvent") {
        const issue = <a href={event.payload.issue?.html_url} className="font-weight-bold">#{event.payload.issue?.number}</a>
        if(event.payload.action === "opened") {
            return {
                ...result,
                type: EventType.ISSUE,
                color: EventColors.SUCCESS,
                icon: GoIssueOpened,
                header: <span>{actor} opened issue {issue} in {repo}</span>
            }
        }
        else if(event.payload.action === "reopened") {
            return {
                ...result,
                type: EventType.ISSUE,
                color: EventColors.SUCCESS,
                icon: GoIssueReopened,
                header: <span>{actor} reopened issue {issue} in {repo}</span>
            }
        }
        else if(event.payload.action === "closed") {
            return {
                ...result,
                type: EventType.ISSUE,
                color: EventColors.MERGE,
                icon: GoIssueClosed,
                header: <span>{actor} closed issue {issue} in {repo}</span>
            }
        }
        else if(event.payload.action === "assigned") {
            const assignee = <a href={event.payload.issue?.assignee?.html_url}>{event.payload.issue?.assignee?.login}</a>
            return {
                ...result,
                type: EventType.ISSUE,
                color: EventColors.EDIT,
                icon: GoPerson,
                header: <span>{actor} assigned {assignee} to issue {issue} in {repo}</span>,
            }
        }
        else if(event.payload.action === "unassigned") {
            const assignee = <a href={event.payload.issue?.assignee?.html_url}>{event.payload.issue?.assignee?.login}</a>
            return {
                ...result,
                type: EventType.ISSUE,
                color: EventColors.EDIT,
                icon: GoPerson,
                header: <span>{actor} unassigned {assignee} from issue {issue} in {repo}</span>,
            }
        }
        else if(event.payload.action === "labeled") {
            const label = <code>{(event.payload as any).label.name}</code>
            return {
                ...result,
                type: EventType.ISSUE,
                color: EventColors.EDIT,
                icon: GoTag,
                header: <span>{actor} added label {label} to issue {issue} in {repo}</span>,
            }
        }
        else if(event.payload.action === "unlabeled") {
            const label = <code>{(event.payload as any).label.name}</code>
            return {
                ...result,
                type: EventType.ISSUE,
                color: EventColors.EDIT,
                icon: GoTag,
                header: <span>{actor} removed label {label} to issue {issue} in {repo}</span>,
            }
        }
    }
    else if(event.type === "PullRequestReviewEvent") {
        const pr = (event.payload as any).pull_request
        const url = <a href={pr.html_url}className="font-weight-bold">#{pr.number}</a>
        if(event.payload.action === "created") {
            return {
                ...result,
                type: EventType.PR_REVIEW,
                color: EventColors.INFO,
                icon: GoEye,
                header: <span>{actor} reviewed {url} in {repo}</span>
            }
        }
    }
    else if(event.type === "PullRequestReviewCommentEvent") {
        const pr = (event.payload as any).pull_request
        const url = <a href={pr.html_url}className="font-weight-bold">#{pr.number}</a>
        if(event.payload.action === "created") {
            return {
                ...result,
                type: EventType.PR_REVIEW_COMMENT,
                color: EventColors.COMMENT,
                icon: GoComment,
                header: <span>{actor} commented on review of {url} in {repo}</span>
            }
        }
    }
    else if(event.type === "PublicEvent") {
        return {
            ...result,
            type: EventType.PUBLIC,
            color: EventColors.SUCCESS,
            icon: GoRepo,
            header: <span>{actor} published new repository {repo}</span>,
        }
    }
    else if(event.type === "PullRequestEvent") {
        const pullRequest = (event.payload as any).pull_request
        const url = <a href={pullRequest.html_url} className="font-weight-bold">#{pullRequest.number}</a>
        if(event.payload.action === "opened") {
            return {
                ...result,
                type: EventType.PR,
                color: EventColors.SUCCESS,
                icon: GoGitPullRequest,
                header: <span>{actor} opened pull request {url} in {repo}</span>,
            }
        }
        else if(event.payload.action === "reopened") {
            return {
                ...result,
                type: EventType.PR,
                color: EventColors.SUCCESS,
                icon: GoGitPullRequest,
                header: <span>{actor} reopened pull request {url} in {repo}</span>,
            }
        }
        else if(event.payload.action === "closed" && pullRequest.merged) {
            return {
                ...result,
                type: EventType.PR,
                color: EventColors.MERGE,
                icon: GoGitMerge,
                header: <span>{actor} merged pull request {url} in {repo}</span>,
            }
        }
        else if(event.payload.action === "closed" && !pullRequest.merged) {
            return {
                ...result,
                type: EventType.PR,
                color: EventColors.DANGER,
                icon: GoGitPullRequest,
                header: <span>{actor} closed pull request {url} in {repo}</span>,
            }
        }
    }
    else if(event.type === "ReleaseEvent") {
        const release = (event.payload as any).release;
        const name = release.name && release.name.length > 0 ? release.name : release.tag
        const url = <a href={release.html_url}><code>{name}</code></a>
        if(event.payload.action === "published") {
            return {
                ...result,
                type: EventType.RELEASE,
                color: EventColors.INFO,
                icon: GoListUnordered,
                header: <span>{actor} published {url} (release) in {repo}</span>,
            }
        }
    }
    else if(event.type === "MemberEvent") {
        const member = (event.payload as any).member;
        const url = <a href={member.html_url}>{member.login}</a>
        if(event.payload.action === "added") {
            return {
                ...result,
                type: EventType.COLLABORATOR_ADD,
                color: EventColors.EDIT,
                icon: GoPerson,
                header: <span>{actor} added {url} as collaborator to {repo}</span>,
            }
        }
    }
    return {
        ...result,
        type: EventType.OTHER,
        color: EventColors.DANGER,
        icon: GoQuestion,
        header: (
            <span style={{color: EventColors.DANGER, fontWeight: 600}}>
                This event could not be loaded!<br />
                <code>{JSON.stringify(event)}</code>
            </span>
        ),
    }
}

function actorElement(event: EndpointEventType) {
    const actor = event.actor
    return <a className="font-weight-bold" href={actorURL(actor)}>{actor.display_login || actor.login}</a>
}

function repoElement(event: EndpointEventType) {
    const repo = event.repo;
    return <a href={"https://github.com/" + repo.name}>{repo.name}</a>
}
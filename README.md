# Postgres VS Mongo

Our purpose here is to benchmark these both amazing technologies. We'll be discussing topics related, nevertheless not limited, to query, insertion and edition performances, understanding easiness, usability, indexing, etc. I'm not aiming to disqualify either of the technologies, though I'm rather looking forward to establishing a common ground so further forums can rely on this to understand how each approach reacts to different scenarios.

If you deal a lot with databases it's pretty high the likelihood of you finding yourself with this question: `which DBMS do I choose for my application?`. Well, at least I've been in this situation many times and I've also seen myself in the middle of superficial and arrogant chats on how one technology would outperform the other, and it's remarkable how much the arguments are biased and bunch of commonplaces. My target is to expose the lies in all those comments and bring a little more of a scientific approach to the topic.

If you're an experienced user of Postgres and Mongo then this should not be so great for you, but you may find it very handy for all the documentation linked in the topics. Also, of course, it would help you in explaining your points to a third person via a structured argument.

### Environment
Throughout all the topics you'll be able to reproduce the found results. That's essential to keep the confidence of this article high, so if you find any non-reproducible step, please report it via **Github Issue** and I'll figure it out. For this, you may want to have your docker environment set as the following:
```
mongo:5.0.3
postgres:15
```
You can always run our benchmark suite with the following:
```
# TODO
```

### `which DBMS do I choose for my application?`

To get out of the commonplaces, I'll try a different approach with Postgres, using it as a document store, just like Mongo, but of course with some well-known limitations. The point is to tackle the people's afraid of dealing with a schemaless Postgres. In other words, stop stating that Postgres doesn't fit for document store. And it will be demonstrated here through various scenarios of querying, updating and inserting.

That will be really important for those applications that need to rely on Postgres and Standard SQL pros, however would require to use schemaless fields. Here we'll see whether you can use Postgres as a document store with JSONB fields.

As well, we'll show how a 

## Topics

- Wildcards
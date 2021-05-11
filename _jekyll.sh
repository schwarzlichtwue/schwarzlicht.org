#!/bin/sh
# Deprecated warnings popping out for ruby v2.7.
# This egrep removes them

bundle exec jekyll build --watch -d /tmp/sl 2>&1 | egrep -v 'deprecated'
#bundle exec jekyll build --watch --limit-posts 30 -d /tmp/sl 2>&1 | egrep -v 'deprecated'

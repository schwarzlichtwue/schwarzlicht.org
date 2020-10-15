#!/bin/sh
# Deprecated warnings popping out for ruby v2.7.
# This egrep removes them

bundle exec jekyll serve -d /tmp/sl 2>&1 | egrep -v 'deprecated'
#bundle exec jekyll serve --limit-posts 30 -d /tmp/sl 2>&1 | egrep -v 'deprecated'

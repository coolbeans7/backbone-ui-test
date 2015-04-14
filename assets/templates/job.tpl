<td>
[% if(url) { %]
    <a href="[[url]]">[[jobid]]</a>
[% } else { %]
    [[id]] 
[% } %]
</td>

<td>
[[modified]]
</td>

<td>
[[status]]
</td>

<td>
[% if(status!=='completed') { %]
    <a href="#" class="pure-button btn-abort">
        abort
    </a>
[% } %]
</td>

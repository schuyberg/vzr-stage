# vzr-stage

A live music visualization suite built with Vue and VZR.

Better docs and a 'standalone' version of VZR coming soon...

For now, you can get up and running with:

        npm install
        npm run dev

Example online at schuyberg.com/vzr (no ssl set up yet, so use firefox)

VZR-Stage Keyboard Commands:
   0 : enable/disable debug panel
   -/+ : adjust sensitivity
   1-9 : enable/disable scenes (only 3 exist so far)
   letters below 1-9 (ie. w,s,x for #2) : change scene parameters

        
More on using VZR [here](./src/vzr/README.md)

More on Vue [here](https://vuejs.org/v2/guide/), and the webpack template [here](https://github.com/vuejs-templates/webpack)


To route audio playback to the visualizer (in OSX), I use [SoundFlower](https://github.com/mattingalls/Soundflower/releases/)

for ctn in $(docker ps -a -q); do docker rm $ctn; done

for ctn in $(docker image ls -a -q); do docker image rm $ctn; done

